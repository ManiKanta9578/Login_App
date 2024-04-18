import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true);
    const db = mongoose.connect(process.env.MONGODB_URI);
    // const db = mongoose.connect(getUri);

    console.log("Database connected");
    return db;
}

export default connect; 