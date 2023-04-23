import { Router } from "express"; 
import { getUserEntries, newEntry } from "../controllers/entry.controller.js";

const transactionRouter = Router()

transactionRouter.post("/nova-entrada/:tipo", newEntry)
transactionRouter.get("/home", getUserEntries)

export default transactionRouter