import { Router } from "express";
import { signIn, signUp, userInfo } from "../controller/auth.controller.js";
import { tokenVerification } from "../middleware/token.verification.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signInSchema, signUpSchema } from "../schema/auth.schema.js";


const authRouter = Router();

authRouter.post("/signup",validateSchema(signUpSchema), signUp)
authRouter.post("/signIn",validateSchema(signInSchema), signIn)
authRouter.get('/users/me', tokenVerification, userInfo)

export default authRouter;