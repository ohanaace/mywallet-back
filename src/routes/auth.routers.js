import { Router } from "express"
import { signUp, singIn } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/cadastro", signUp)
authRouter.post("/", singIn)

export default authRouter