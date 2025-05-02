import express from "express";
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router(); // use express, not mongoose

cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
