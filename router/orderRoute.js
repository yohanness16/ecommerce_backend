import express from 'express';
import { createOrder, getAllOrders , getOrderById , updateOrderStatus } from '../controller/orderController.js';
import validateRequest from '../middleware/validator.js';
import { AddorderSchema } from '../validator/orderValidator.js'; 

const router = express.Router(); 

router.post("/", validateRequest(AddorderSchema), createOrder); 
router.get("/", getAllOrders); 
router.get("/:id", getOrderById); 
router.put("/:id/status",  updateOrderStatus);

export default router;