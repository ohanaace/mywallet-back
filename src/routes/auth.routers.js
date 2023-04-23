import { Router } from "express"
import { signUp, logIn, logOut } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/cadastro", signUp)
authRouter.post("/", logIn)
authRouter.delete("/logout", logOut)

export default authRouter