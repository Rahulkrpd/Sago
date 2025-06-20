import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL as string;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
    throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
    // Add a type definition for global to avoid TypeScript errors
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise!;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;