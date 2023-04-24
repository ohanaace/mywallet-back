import { Router } from "express"; 
import { getUserEntries, newEntry } from "../controllers/entry.controller.js";
import { validateSchema } from "../middlewares/validationMiddleWare.js";
import { entrySchema } from "../schemas/entrySchema.js";
import { authValidate } from "../middlewares/authMiddleware.js";

const transactionRouter = Router()
transactionRouter.use(authValidate)
transactionRouter.post("/nova-entrada/:tipo", validateSchema(entrySchema), newEntry)
transactionRouter.get("/home", getUserEntries)

export default transactionRouter