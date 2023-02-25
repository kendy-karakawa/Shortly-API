import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import urlRouter from "./routes/url.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter, urlRouter]);

const port = 5000;
app.listen(port, ()=> console.log(`Server is running in Port: ${port}!!`));