import cors from "cors"
import express from "express"
import authRouter from "./routes/auth.routers.js"
import { transactionRouter } from "./routes/transaction.routers.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(authRouter)
app.use(transactionRouter)

const PORT = 5000
app.listen(PORT)

