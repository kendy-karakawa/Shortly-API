import { Router } from "express";
import { shorten, getUrlById } from "../controller/url.controller.js";
import { tokenVerification } from "../middleware/token.verification.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { urlSchema } from "../schema/url.schema.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten",tokenVerification, validateSchema(urlSchema), shorten)
urlRouter.get("/urls/:id",getUrlById)

export default urlRouter;