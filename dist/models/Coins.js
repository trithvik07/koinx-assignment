"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const coinModel = new mongoose_1.default.Schema({
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
});
exports.CoinModel = mongoose_1.default.model("Coin", coinModel);
