export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    // Confirm that db is safely accessible
    const connection = model?.db?.db;
    if (!connection) throw new Error(`Model ${modelName} is missing a valid .db connection`);

    const modelExists = await connection.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
