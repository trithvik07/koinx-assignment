import { CoinModel } from "../models/Coins"

const coinIds = ["bitcoin", "matic-network", "ethereum"]
export function fetchCoinData() {
	coinIds.forEach(async (c) => {
		const data = await fetch(`https://api.coingecko.com/api/v3/coins/${c}`)
		const json = await data.json()
		const coin = await CoinModel.create({
			id: json.id,
			current_price: json.market_data.current_price.usd,
			market_cap: json.market_data.market_cap.usd,
			oneday_change: json.market_data.price_change_24h_in_currency.usd
		})
		await coin.save()
	})
}
