import joi from "joi";

export const registrationSchema = joi.object({
    name: joi.string().alphanum().min(3).max(10).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).required(),
    password: joi.string().alphanum().min(3).max(10).required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
  });