import { Router } from "express";
import { shorten, getUrlById, redirectUrl, deleteShortenUrl } from "../controller/url.controller.js";
import { tokenVerification } from "../middleware/token.verification.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { urlSchema } from "../schema/url.schema.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten",tokenVerification, validateSchema(urlSchema), shorten)
urlRouter.get("/urls/:id",getUrlById)
urlRouter.get("/urls/open/:shortUrl", redirectUrl)
urlRouter.delete("/urls/:id",tokenVerification, deleteShortenUrl)



export default urlRouter;