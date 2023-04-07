import path from "path";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import { router } from "./routes";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());
app.use("/v1", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/files", express.static(path.resolve(__dirname, "..", "temp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

app.get('/terms', (req: Request, res: Response)=> {
    return res.json({
        message: "Service Terms"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} - Controle de Estoque`);
});
