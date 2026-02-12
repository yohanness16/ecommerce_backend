import express from "express";
import { addToCart, getCart, updateQuantity, removeFromCart } from "../controller/cartController.js";
import validateRequest from "../middleware/validator.js";
import { cartAddItemSchema, cartUpdateSchema } from "../validator/cartValidator.js";

const router = express.Router();

router.post("/", validateRequest(cartAddItemSchema), addToCart);
router.get("/", getCart);
router.put("/:cartId/item/:productId", validateRequest(cartUpdateSchema), updateQuantity);
router.delete("/:cartId/item/:productId", validateRequest(cartAddItemSchema), removeFromCart);

export default router;