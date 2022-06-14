import joi from "joi";

export const signupSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    pictureUrl: joi.string().uri().required()
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})
