import bcrypt from "bcrypt"
import joi from "joi"
import { v4 as uuid } from "uuid"
import { db } from "../database.js"

export async function signUp(req, res){
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
      res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function logIn(req, res) {
    const {email, password} = req.body

    const signInSchema = joi.object({
        password: joi.string().required().min(3),
        email: joi.string().email().required()
    })
    const newSignIn = { email, password }
    const validation = signInSchema.validate(newSignIn, { abortEarly: false })
    if (validation.error) {
        const error = validation.error.details.map(err => err.message)
        return res.status(422).send(error)
    }
    try {
        const user = await db.collection("users").findOne({email})
        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid()
            await db.collection("sessions").insertOne({userId: user._id, token})
            res.send(token)
        }
        if(!user) return res.status(404).send("E-mail não cadastrado.")
        if(!bcrypt.compareSync(password, user.password)) res.status(401).send("Senha incorreta.")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function logOut(){
    try {
        
    } catch (error) {
        
    }
}