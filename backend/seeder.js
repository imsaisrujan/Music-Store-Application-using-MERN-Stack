import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";             // for colored console messages

// Data files
import users from "./data/users.js";
import products from "./data/products.js";

// Models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

// DB connection
import connectDB from "./config/db.js";

dotenv.config();

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // wipe existing
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // seed users
    const createdUsers = await User.insertMany(users);
    const adminId = createdUsers[0]._id;

    // attach admin to products & seed
    const sampleProducts = products.map(p => ({ ...p, user: adminId }));
    await Product.insertMany(sampleProducts);

    console.log("✔ Data Imported!".green.inverse);
    process.exit(0);
  } catch (err) {
    console.error(`✖ Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑 Data Destroyed!".red.inverse);
    process.exit(0);
  } catch (err) {
    console.error(`✖ Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

// CLI flag handling
if (process.argv.includes("-d")) {
  destroyData();
} else {
  importData();
}
