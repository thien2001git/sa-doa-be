import BuildConfig from "../../config/BuildConfig";


const { MongoClient } = require('mongodb');

const client = new MongoClient(BuildConfig.CONNECTION_STRING);

export default client