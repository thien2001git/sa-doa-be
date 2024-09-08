const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://hoangthien66771508:1B1oxqEpXUW8D46c@cluster0.kkntl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri);

module.exports = client