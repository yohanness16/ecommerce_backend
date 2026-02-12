import Order from "../model/orderModel.js";
import Cart from "../model/cartModel.js";
import products from "../model/productModel.js";
import customError from "../utils/Error.js";
import logger from "../lib/logger.js";

export const createOrder = async (req, res, next) => {
    try {
        const { customerInfo, cartId } = req.body; 
        
        // 1. Fetch the cart and the LATEST product data in one go
        const cart = await Cart.findById(cartId).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return next(new customError("Cart not found or empty", 400));
        }

        const orderItems = [];

        // 2. Validate items using the populated data
        for (const item of cart.items) {
            const product = item.productId; // This is the actual product object from the DB

            if (!product) {
                return next(new customError("A product in your cart no longer exists", 404));
            }

            // FORCE TYPE CONVERSION: Ensure we compare Numbers, not Strings
            const currentStock = Number(product.stock);
            const requestedQuantity = Number(item.quantity);

            if (currentStock < requestedQuantity) {
                logger.warn(`Insufficient stock for ${product.name}. DB Stock: ${currentStock}, Requested: ${requestedQuantity}`);
                return next(new customError(`Insufficient stock for ${product.name}`, 400));
            }

            // Snapshot the price and name (in case the product changes price later)
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: requestedQuantity
            });
        }

        // 3. Create the Order Record
        const newOrder = await Order.create({
            items: orderItems,
            totalPrice: cart.totalPrice,
            customerInfo
        });

        // 4. Update Stock & Clear Cart
        // We do this AFTER order creation to be safe
        for (const item of cart.items) {
            await products.findByIdAndUpdate(item.productId._id, { 
                $inc: { stock: -Number(item.quantity) } 
            });
        }

        await Cart.findByIdAndDelete(cartId);

        logger.info(`Order ${newOrder._id} created successfully`);

        // 5. Send ONE final response
        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully",
            data: newOrder 
        });

    } catch (error) {
        logger.error("Order Creation Error:", error);
        next(new customError("Failed to create order", 500));
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort("-createdAt");
        logger.info("Orders retrieved successfully");
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        logger.error("Error retrieving orders:", error);
        next(new customError("Failed to retrieve orders", 500)); 
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            logger.warn("Order not found with ID: " + req.params.id);
            return next(new customError("Order not found", 404));
        }

        logger.info("Order retrieved successfully with ID: " + req.params.id);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        logger.error("Error retrieving order by ID:", error);
        next(new customError("Failed to retrieve order", 500)); 
    } 
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            { status },
            { new: true ,
            runValidators: true 
            }
        );    
        if (!order) {
            logger.warn("Order not found with ID: " + req.params.id);
            return next(new customError("Order not found", 404));   
        }
        logger.info("Order status updated successfully for ID: " + req.params.id);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        logger.error("Error updating order status:", error); 
        next(new customError("Failed to update order status", 500)); 
    }
};