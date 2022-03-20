import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  const dbName: string = "Practica4";
  const usr = process.env.DB_USER;
  const pwd = process.env.DB_PWD;
  const cluster = process.env.CLUSTER
  const mongouri: string = `mongodb+srv://${usr}:${pwd}@${cluster}/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db(dbName);
  } catch (e) {
    throw e;
  }
};
