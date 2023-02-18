import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use([]);

const port = 5000;
app.listen(port, ()=> console.log(`Server is running in Port: ${port}!!`));