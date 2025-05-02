import mongoose from "mongoose";

import authUser from "../middlewares/authUser";
import { updateCart } from "../controllers/cartController";

const carRouter = mongoose.Router();

carRouter.post("/update", authUser, updateCart);

export default carRouter;
