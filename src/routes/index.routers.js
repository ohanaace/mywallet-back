import { Router } from "express";
import authRouter from "./auth.routers.js";
import transactionRouter from "./transaction.routers.js";

const routers = Router()

routers.use(authRouter)
routers.use(transactionRouter)

export default routers