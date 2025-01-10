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
exports.coinRouter = void 0;
const express_1 = require("express");
const Coins_1 = require("../models/Coins");
exports.coinRouter = (0, express_1.Router)();
exports.coinRouter.get("/stats/:coinId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinId = req.params.coinId;
        const data = yield Coins_1.CoinModel.findOne({ id: coinId }).sort({ _id: -1 });
        res.status(200).json(data);
    }
    catch (e) {
        console.log("Error occured");
        res.status(500).json({ error: e });
    }
}));
exports.coinRouter.get("/deviation/:coinId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinId = req.params.coinId;
        const documents = yield Coins_1.CoinModel.find({ id: coinId }).sort({ _id: -1 }).limit(100).select("current_price -_id");
        const values = documents.map((d) => d.current_price);
        const mean = values.reduce((tot, val) => tot + val, 0) / values.length;
        const sqDiff = values.map(val => Math.pow(val - mean, 2));
        const avgsqDiff = sqDiff.reduce((tot, val) => tot + val, 0) / values.length;
        const std = Math.sqrt(avgsqDiff);
        res.status(200).json(std);
    }
    catch (e) {
        console.log("Error occured");
        res.status(500).json({ error: e });
    }
}));
