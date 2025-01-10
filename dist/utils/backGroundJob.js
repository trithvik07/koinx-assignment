"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCoinData = void 0;
const Coins_1 = require("../models/Coins");
const coinIds = ["bitcoin", "matic-network", "ethereum"];
function fetchCoinData() {
    coinIds.forEach((c) => __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(`https://api.coingecko.com/api/v3/coins/${c}`);
        const json = yield data.json();
        const coin = yield Coins_1.CoinModel.create({
            id: json.id,
            current_price: json.market_data.current_price.usd,
            market_cap: json.market_data.market_cap.usd,
            oneday_change: json.market_data.price_change_24h_in_currency.usd
        });
        coin.save();
    }));
}
exports.fetchCoinData = fetchCoinData;
