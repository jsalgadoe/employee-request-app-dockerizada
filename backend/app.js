import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { employeeRouter } from "./routes/employee.js";
import { requestRouter } from "./routes/request.js";

import { validarJWT } from "./middlewares/validar-jwt.js";
import { verificarAdmin } from "./middlewares/verificar_admin.js";
export const app = express();

dotenv.config();

const PORT = process.env.PORT || 12345;

app.use(cors());
app.disable("x-powered-by");

app.use(express.json());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/request", requestRouter);
app.get("/test", (req, res) => {
  res.status(200).json("Hola mundo");
});

app.listen(PORT, () => {
  console.log(`Servido en el puerto http://localhost:${PORT} !!!`);
});
