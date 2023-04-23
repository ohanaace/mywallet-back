import { Router } from "express"
import { signUp, logIn } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/cadastro", signUp)
authRouter.post("/", logIn)

export default authRouter