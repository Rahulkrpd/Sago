import mongoose from "mongoose";




type ConnectionObject = {
    isConnected?: number
}


const connection: ConnectionObject = {

}


async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        // console.log("already connected to database")
        return
    }

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB URL IS not present")
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '', {})
        connection.isConnected = db.connections[0].readyState
        // console.log("DB connected successfully")
    } catch (error) {
        // console.log("Database connnection fail", error)
        alert(error)
        process.exit(1)
    }
}


export default dbConnect;

