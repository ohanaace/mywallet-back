import joi from "joi"
export const signInSchema = joi.object({
    password: joi.string().required().min(3),
    email: joi.string().email().required()
})