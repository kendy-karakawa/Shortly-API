import { Router } from "express";
import { shorten } from "../controller/url.controller.js";
import { tokenVerification } from "../middleware/token.verification.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { urlSchema } from "../schema/url.schema.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten",tokenVerification, validateSchema(urlSchema), shorten)


export default urlRouter;