import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/myjournal';
const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise; 