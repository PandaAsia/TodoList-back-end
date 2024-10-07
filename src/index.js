import express from "express";
import { PORT } from "./config.js";
import useRouter from "./router/taks.routers.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
//permitir que las solicitudes fetch
app.use(cors());
app.use(useRouter);

app.listen(PORT);
console.log(`server on port:`, PORT);
