import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectToDb from "./utils/db"
import { fetchCoinData } from "./utils/backGroundJob"
import { coinRouter } from "./routers/coinRoute"

dotenv.config()

connectToDb()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/", coinRouter)

app.listen(process.env.PORT, () => {
	console.log("server running")
	fetchCoinData()
	setInterval(() => {
		fetchCoinData()
	}, 1000 * 60 * 60 * 2)
})
