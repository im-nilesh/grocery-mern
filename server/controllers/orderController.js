import Product from "../models/Product.js";
import Order from "../models/Order.js";

//place Order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid date" });
    }

    //calc amount using items

    let amount = await items.reduce(async (acc, items) => {
      const product = await Product.findById(items.product);
      return (await acc) + product.offerPrice * items.quantity;
    }, 0);

    //add tax charge (2%)

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get orders by user ID : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Use userId from auth middleware
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all orders (for seller / admin): api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }], // Corrected "payementType" to "paymentType"
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
