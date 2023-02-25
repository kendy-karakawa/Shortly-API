import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).required(),
    password: joi.string().required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
  });

  export const signInSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).required(),
    password: joi.string().required()
  });