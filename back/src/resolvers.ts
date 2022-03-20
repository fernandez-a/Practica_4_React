import { Request, Response } from "express";
import { Collection, Db } from "mongodb";
import { stringify } from "querystring";
import { v4 as uuidv4 } from 'uuid';
import { setFlagsFromString } from "v8";
import  bcrypt  from 'bcrypt';
require('dotenv').config()

type User = {
  email: string,
  name: string,
  surname: string
}

export const addUser = async (req: Request, res: Response) => {
  if (!req.query.email || !req.query.name || !req.query.surname || req.query.email == ""  || req.query.name == "" || req.query.surname == "") {
    res.status(200).send("Missing Params");
  }
  const { email, name, surname } = req.query;
  const user1: User = {
    email: email as string,
    name: name as string,
    surname: surname as string
  }
  const db: Db = req.app.get("db");
  const collection: Collection = db.collection("Users");
  const user = await collection.findOne({ email: email });
  if (!user) {
    const char = await collection.insertOne(
      user1
    );
    const users = await collection.find().toArray();
    const usersNoId = users.map((user)=> {return {email: user.email,name : user.name,surname:user.surname}})
    res.status(200).json(usersNoId)
  } else {
    res.status(409).send("Email already in use.")
  }
}

export const getUsers = async (req: Request, res: Response) => {
  
  const db: Db = req.app.get("db");
  const collection: Collection = db.collection("Users");
  const users = await collection.find().toArray();
  const usersNoId = users.map((user)=> {return {email: user.email,name : user.name,surname:user.surname}})
  console.log(usersNoId)
  res.status(200).json( {users : usersNoId} );

};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.query.email) {
    res.status(500).send("Missing Params");
  }
  const email = req.query.email as string;
  const db: Db = req.app.get("db");
  const collection: Collection = db.collection("Users");
  const user = await collection.findOne({ email: email });
  if (user) {
    const char = await collection.findOneAndDelete({
      email: email
    }
    );
    const users = await collection.find().toArray();
    const usersNoId = users.map((user)=> {return {email: user.email,name : user.name,surname:user.surname}})
    res.status(200).json(usersNoId)
  } else {
    res.status(409).send("This account does not exist.")
  }
}

