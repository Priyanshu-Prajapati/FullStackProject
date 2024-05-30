import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import User from "../models/user";

async function start() {
  const url = `mongodb://localhost:27017`;
  const Mongoclient = new MongoClient(url);

  await Mongoclient.connect();
  const db = Mongoclient.db("FullStack-Database");

  mongoose.connect(
    "mongodb://localhost:27017/registeredUsers",
    console.log("Connected To the Database!")
  );

  const app = express();
  app.use(express.json());

  app.use(cookieParser());
 
  app.post("/api/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();
    const { password, ...data } = await result.toJSON();
    res.send(data);
    } catch (e) {
      return res.status(404).send({
        messge: "User Already registered",
      });
    }
    
  });

  app.post("/api/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        messge: "User not Found!!",
      });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({
        messge: "Invalid Credentials!!",
      });
    }

    const token = jwt.sign({ _id: user._id }, "supersecretsecret");

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("jwt", token, options);

    res.send({
      message: "Success",
    });
  });

  app.get("/api/user", async (req, res) => {
    try{
      const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, "supersecretsecret");

    if (!claims) {
      return res.status(401).send({
        messge: "Unauthenticated!!",
      });
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.send(data);
    }catch (e) {
      return res.status(401).send({
        messge: "Unauthenticated!!",
      });
    }
    
  });

  app.post("/api/logout", async (req, res) => {
    const val = "";
    const options = {maxAge: 0};

    res.cookie("jwt", val, options);

    res.send({
      message: 'success'
    })
  });

  app.post('/api/orderDetails', async (req, res) => {
    const orderEmail = req.body.email;
    const orderCardHolder = req.body.cardHolder;
    const orderCardDetails = req.body.cardDetails;
    const orderCardExp = req.body.cardExp;
    const orderCardcvc = req.body.cardcvc;
    const orderBillingAdd = req.body.billingAdd;
    const orderBillingZip = req.body.billingZip;
    const orderTotalPrice = req.body.totalPrice;

    await db.collection("orderDetails").insertOne({
      email: orderEmail,
      cardholder: orderCardHolder,
      cardDetails: orderCardDetails,
      cardExp: orderCardExp,
      cardcvc: orderCardcvc,
      billingAdd: orderBillingAdd,
      billingZip: orderBillingZip,
      totalPrice: orderTotalPrice
    });
    res.send("Added to database!!");

  })

  app.use("/images", express.static(path.join(__dirname, "../assets")));

  app.get("/api/product", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  }

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/api/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId },
      }
    );

    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );

    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
