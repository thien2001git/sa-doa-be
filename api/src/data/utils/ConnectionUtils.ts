import BuildConfig from "../../config/BuildConfig";
import {MongoClientOptions} from "mongodb";

const {MongoClient, ServerApiVersion} = require('mongodb');

const mongoClientOptions: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

const client = new MongoClient(BuildConfig.CONNECTION_STRING, mongoClientOptions);

export default client