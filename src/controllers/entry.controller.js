import joi from "joi"
import dayjs from "dayjs"
import { db } from "../database.js"

export async function newEntry(req, res) {
    const { authorization } = req.headers
    const { value, description } = req.body
    const token = authorization?.replace("Bearer ", "")

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
            await db.collection("registers").insertOne({ value, description, type: "positive", date: dayjs().format("DD/MM"), owner: session.userId })
            res.sendStatus(201)
        }
        if (req.params.tipo === "saida") {
            await db.collection("registers").insertOne({ value, description, type: "negative", date: dayjs().format("DD/MM"), owner: session.userId })
            res.sendStatus(201)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function getUserEntries(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)
    try {
        let total = 0
        const session = await db.collection("sessions").findOne({ token })
        if (!session) return res.sendStatus(401)
        const transactions = await db.collection("registers").find({ owner: session.userId }).sort({ $natural: -1 }).toArray()
        for(let i = 0; i < transactions.length; i++){
            const registry = transactions[i]
            if(registry.type === "positive") total += Number(registry.value)
            if(registry.type === "negative") total -= Number(registry.value)
        }
        res.send({transactions, total: total.toFixed(2)})
    } catch (error) {
        res.status(500).send(error.message)
    }
}