import mongoose from 'mongoose';

const host = process.env.MONGO_HOST ?? 'localhost';
const port = process.env.MONGO_PORT ?? '27017';
const db = process.env.MONGO_DB_NAME ?? 'starsOfEternity';

export const mongoConnect = () =>  mongoose.connect(`mongodb://${host}:${port}/${db}`);
