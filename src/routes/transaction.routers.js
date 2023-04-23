import { Router } from "express";
import { newEntry } from "../controllers/entry.controller.js";

export const transactionRouter = Router()

transactionRouter.post("/nova-entrada/:tipo", newEntry)