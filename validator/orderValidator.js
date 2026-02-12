import Joi from "joi";


export const AddorderSchema = Joi.object({
    customerInfo: Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(10).required()
    }).required(),
    cartId: Joi.string().required().messages({
        'string.empty': 'Cart ID is required to place an order'
    }),
    status: Joi.string().valid("pending", "completed", "cancelled").default("pending")
});
