"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const backGroundJob_1 = require("./utils/backGroundJob");
const coinRoute_1 = require("./routers/coinRoute");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/", coinRoute_1.coinRouter);
app.listen(process.env.PORT, () => {
    console.log("server running");
    (0, backGroundJob_1.fetchCoinData)();
    setInterval(() => {
        (0, backGroundJob_1.fetchCoinData)();
    }, 1000 * 60 * 60 * 2);
});
