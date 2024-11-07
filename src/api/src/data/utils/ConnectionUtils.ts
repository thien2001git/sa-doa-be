import mongoose from 'mongoose';

const connect = (uri?: string, dbName?: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (!uri) return reject(new Error('Uri is required'));
        if (!dbName) return reject(new Error('DB name is required'));
        mongoose
            .connect(uri, {
                autoIndex: true,
                dbName,
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default connect;
