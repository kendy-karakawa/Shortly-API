import { Router } from "express";
import { ranking } from "../controller/rank.controller.js";



const rankRouter = Router();

rankRouter.get("/ranking", ranking)

export default rankRouter;