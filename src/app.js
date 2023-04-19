import bcrypt from "bcrypt"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import joi from "joi"
import { MongoClient } from "mongodb"
import { v4 as uuid } from "uuid"

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
} catch (error) {
    console.log(error.message)
}
const db = mongoClient.db()

app.post("/cadastro", async (req, res) => {
    const { name, email, password } = req.body

    const signUpSchema = joi.object({
        name: joi.string().required(),
        password: joi.string().required().min(3),
        email: joi.string().email().required()
    })
    const newSignUp = { name, email, password }
    const validation = signUpSchema.validate(newSignUp, { abortEarly: false })
    if (validation.error) {
        const error = validation.error.details.map(err => err.message)
        return res.status(422).send(error)
    }
    try {
        const usedEmail = await db.collection("users").findOne({ email })
        if (usedEmail) return res.status(409).send("Email já cadastrado.")
        const passwordHash = bcrypt.hashSync(password, 10)
       await db.collection("users").insertOne({ name, email, password: passwordHash })
       const newUser = await db.collection("users").find().toArray()
       console.log(newUser)
      res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/", async (req, res) => { })

const PORT = 5000
app.listen(PORT)

