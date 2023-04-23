import joi from "joi"
import { db } from "../database.js"

export async function newEntry(req, res) {
    const { authorization } = req.headers
    const { value, description } = req.body
    const token = authorization?.replace("Bearer ", "")
    console.log(req.params)

    if (!token) return res.sendStatus(401)

    const entrySchema = joi.object({
        value: joi.number().precision(2).positive().required(),
        description: joi.string().required()
    })
    const validation = entrySchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const err = validation.error.details.map(error => error.message)
        return res.status(422).send(err)
    }
    try {
        const session = await db.collection("sessions").findOne({ token })
        if (!session) return res.sendStatus(401)
        if (req.params.tipo === "entrada") {
            const registry = await db.collection("registers").insertOne({ value, description, type: "positive" })
            console.log("registro de entrada", registry)
            res.sendStatus(201)
        }
        if (req.params.tipo === "saida") {
            const registry = await db.collection("registers").insertOne({ value, description, type: "negative" })
            console.log("registro de saída", registry)
            res.sendStatus(201)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}