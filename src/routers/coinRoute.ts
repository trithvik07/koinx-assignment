import { Router } from "express"
import { CoinModel } from "../models/Coins"


export const coinRouter = Router()

coinRouter.get("/stats/:coinId", async (req, res) => {
	try {
		const coinId = req.params.coinId
		const data = await CoinModel.findOne({ id: coinId }).sort({ _id: -1 })
		res.status(200).json(data)
	} catch (e) {
		console.log("Error occured")
		res.status(500).json({ error: e })
	}
})


coinRouter.get("/deviation/:coinId", async (req, res) => {
	try {
		const coinId = req.params.coinId
		const documents = await CoinModel.find({ id: coinId }).sort({ _id: -1 }).limit(100).select("current_price -_id")
		const values = documents.map((d) => d.current_price)

		const mean = values.reduce((tot, val) => tot + val, 0) / values.length
		const sqDiff = values.map(val => Math.pow(val - mean, 2))
		const avgsqDiff = sqDiff.reduce((tot, val) => tot + val, 0) / values.length

		const std = Math.sqrt(avgsqDiff)
		res.status(200).json(std)
	}
	catch (e) {
		console.log("Error occured")
		res.status(500).json({ error: e })
	}
})
