import joi from "joi"
export const signUpSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required().min(3),
    email: joi.string().email().required()
})