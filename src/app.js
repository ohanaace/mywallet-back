import cors from "cors"
import express from "express"
import routers from "./routes/index.routers.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(routers)

app.listen(process.env.PORT)

