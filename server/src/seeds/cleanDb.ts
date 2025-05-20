import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    if (!model) throw new Error(`Model "${modelName}" not found in models`);

    // Access native MongoDB connection
    const connection = model.db?.db;
    if (!connection) throw new Error(`Model "${modelName}" does not have a valid .db connection`);

    const collections = await connection.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      console.log(`⚠️ Dropping collection: ${collectionName}`);
      await db.dropCollection(collectionName);
    } else {
      console.log(`ℹ️ Collection ${collectionName} does not exist`);
    }
  } catch (err) {
    console.error('❌ Error in deleteCollectionIfExists:', err);
    throw err;
  }
};
