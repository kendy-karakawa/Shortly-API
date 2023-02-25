import { Router } from "express";
import { signUp } from "../controller/auth.controller.js";
import { authValidation } from "../middleware/auth.middleware.js";


const authRouter = Router();

authRouter.post("/signup",authValidation ,signUp)

export default authRouter;