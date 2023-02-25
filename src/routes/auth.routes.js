import { Router } from "express";
import { signIn, signUp } from "../controller/auth.controller.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signInSchema, signUpSchema } from "../schema/auth.schema.js";


const authRouter = Router();

authRouter.post("/signup",validateSchema(signUpSchema), signUp)
authRouter.post("/signIn",validateSchema(signInSchema), signIn)

export default authRouter;