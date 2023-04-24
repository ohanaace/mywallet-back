import { Router } from "express"
import { signUp, logIn, logOut } from "../controllers/auth.controller.js"
import { validateSchema } from "../middlewares/validationMiddleWare.js"
import { signUpSchema } from "../schemas/signUpSchema.js"
import { signInSchema } from "../schemas/signInSchema.js"

const authRouter = Router()

authRouter.post("/cadastro", validateSchema(signUpSchema), signUp)
authRouter.post("/", validateSchema(signInSchema), logIn)
authRouter.delete("/logout", logOut)

export default authRouter