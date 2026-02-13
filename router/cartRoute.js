import express from "express";
import {createNewCart, addItemToSpecificCart, getCart, updateQuantity, removeFromCart } from "../controller/cartController.js";
import validateRequest from "../middleware/validator.js";
import { cartAddItemSchema, cartUpdateSchema } from "../validator/cartValidator.js";

const router = express.Router();

router.post("/create", createNewCart);
router.post("/:cartId/add", validateRequest(cartAddItemSchema), addItemToSpecificCart);
router.get("/", getCart);
router.put("/:cartId/item/:productId", validateRequest(cartUpdateSchema), updateQuantity);
router.delete("/:cartId/item/:productId", validateRequest(cartAddItemSchema), removeFromCart);

export default router;