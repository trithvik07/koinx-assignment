import mongoose from "mongoose"


export default function connectToDb() {
	mongoose.connect(process.env.DB_URI || "")
}


