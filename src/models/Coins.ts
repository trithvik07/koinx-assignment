import mongoose from "mongoose"



const coinModel = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	current_price: {
		type: Number,
		required: true
	},
	market_cap: {
		type: Number,
		required: true
	},
	oneday_change: {
		type: Number,
		required: true
	}
})

export const CoinModel = mongoose.model("Coin", coinModel)
