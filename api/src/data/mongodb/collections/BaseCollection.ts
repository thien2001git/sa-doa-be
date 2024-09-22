import {MongoClient, WithId} from "mongodb";
import client from "../../utils/ConnectionUtils";

export class BaseCollection<T> {
    protected collectionName: string
    private dbName = "sa-doa"

    constructor(collectionName: string) {
        console.log("client connect")
        this.collectionName = collectionName
        client.connect().then((res: MongoClient) => {
            console.log("client connect ok")
        }).catch(() => {
            console.log("client connect not ok")
        })
    }

    async create(data: T) {
        const result = await client.db(this.dbName).collection(this.collectionName).insertOne(data);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

    async createAll(data: Array<T>) {
        const result = await client.db(this.dbName).collection(this.collectionName).insertMany(data);
        console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
        console.log(result.insertedIds);
    }

    async findOne(filter: T) {
        const result = await client.db(this.dbName).collection(this.collectionName).findOne(filter);
        if (result) {
            console.log(`Found a listing in the collection with the name '${filter}':`);
            console.log(result);
        } else {
            console.log(`No listings found with the name '${filter}'`);
        }
        return result
    }

    async findAll() {
        console.log("findAll")
        const cursor = await client.db(this.dbName).collection(this.collectionName).find({})
        const results = await cursor.toArray();

        if (results.length > 0) {
            results.forEach((result: WithId<Document>, i: number) => {
                console.log(`${i + 1}. result: ${JSON.stringify(result)}`);
            });
        } else {
            console.log(`No listings found`);
        }
        return results
    }

    async upsert(filter: T, newValue: T) {
        const result = await client.db(this.dbName).collection(this.collectionName)
            .updateOne(filter, {$set: newValue}, {upsert: true});

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }

    async delete(data: T) {
        const result = await client.db(this.dbName).collection(this.collectionName)
            .deleteOne(data);
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    }

    async deleteAll(data: Array<T>) {
        data.forEach((value: T) => {
            this.delete(value)
        })
    }
}