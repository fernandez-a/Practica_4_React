import { Collection, Db } from "mongodb";
import { connectDB } from "./DBconnection";
import express from "express";
import { getUsers, addUser, deleteUser } from "./resolvers";
import moment from "moment";

const run = async () => {
  const db: Db = await connectDB();
  const app = express();
  app.set("db", db);
  app.use(express.json());

  app.get("/status", async (req, res) => {
    const date = new Date();
    res.status(200).send(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`);
  });
  app.get("/getUsers", getUsers);
  app.post("/addUser", addUser);
  app.post("/deleteUser", deleteUser);

  app.listen(3001);
};

try {
  run();
} catch (e) {
  console.error(e);
}


