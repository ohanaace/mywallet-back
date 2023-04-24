import dayjs from "dayjs"
import { db } from "../database.js"

export async function newEntry(req, res) {
    const {tipo} = req.params
    const { value, description } = req.body
    const user = res.locals.user
    const session = res.locals.session

    try {
        if (tipo === "entrada") {
            await db.collection("registers").insertOne({ value, description, type: "positive", date: dayjs().format("DD/MM"), owner: session.userId })
            res.sendStatus(201)
        }
        if (tipo === "saida") {
            await db.collection("registers").insertOne({ value, description, type: "negative", date: dayjs().format("DD/MM"), owner: session.userId })
            res.sendStatus(201)
        }
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}
export async function getUserEntries(req, res) {
    const user = res.locals.user
    const session = res.locals.session
    try {
        let total = 0
        const transactions = await db.collection("registers").find({ owner: session.userId }).sort({ $natural: -1 }).toArray()
        for(let i = 0; i < transactions.length; i++){
            const registry = transactions[i]
            if(registry.type === "positive") total += Number(registry.value)
            if(registry.type === "negative") total -= Number(registry.value)
        }
        res.send({transactions, total: total.toFixed(2), name: user.name})
    } catch (error) {
        res.status(500).send(error.message)
    }
}