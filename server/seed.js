import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Quantum Sneakers",
    description: "Premium futuristic sneakers.",
    price: 120,
    category: "Footwear",
    image: "/images/product1.jpg",
  },
  {
    name: "Holo Jacket",
    description: "Futuristic holographic jacket.",
    price: 160,
    category: "Jackets",
    image: "/images/product2.jpg",
  },
  {
    name: "Cyber Cap",
    description: "A cap with cybernetic style.",
    price: 80,
    category: "Accessories",
    image: "/images/product3.jpg",
  },
  {
    name: "Lunar Boots",
    description: "Designed for extreme comfort and looks.",
    price: 140,
    category: "Footwear",
    image: "/images/product4.jpg",
  },
  {
    name: "Aurora Shades",
    description: "Style that glows.",
    price: 60,
    category: "Accessories",
    image: "/images/product5.jpg",
  },
  {
    name: "Urban X Hoodie",
    description: "City-ready, future-proof hoodie.",
    price: 110,
    category: "Jackets",
    image: "/images/product6.jpg",
  },
  {
    name: "Nebula Sneakers",
    description: "Glow in the dark shoes.",
    price: 150,
    category: "Footwear",
    image: "/images/product7.jpg",
  },
  {
    name: "Titan Jacket",
    description: "Weatherproof tech jacket.",
    price: 200,
    category: "Jackets",
    image: "/images/product8.jpg",
  },
  {
    name: "Core Beanie",
    description: "Soft, warm, and styled.",
    price: 35,
    category: "Accessories",
    image: "/images/product9.jpg",
  },
  {
    name: "Rogue Runner Shoes",
    description: "Bold and rugged trail shoes.",
    price: 135,
    category: "Footwear",
    image: "/images/product10.jpg",
  },
  {
    name: "Matrix Gloves",
    description: "Touchscreen-ready gloves.",
    price: 40,
    category: "Accessories",
    image: "/images/product11.jpg",
  },
  {
    name: "Stealth Bomber Jacket",
    description: "All-black stealthy vibe.",
    price: 190,
    category: "Jackets",
    image: "/images/product12.jpg",
  },
  {
    name: "Reflex Sneakers",
    description: "High performance, lightweight.",
    price: 130,
    category: "Footwear",
    image: "/images/product13.jpg",
  },
  {
    name: "Volt Watch",
    description: "Minimal digital fashion watch.",
    price: 95,
    category: "Accessories",
    image: "/images/product14.jpg",
  },
  {
    name: "Drip Slide Sandals",
    description: "Slide in comfort and style.",
    price: 60,
    category: "Footwear",
    image: "/images/product15.jpg",
  },
  {
    name: "Ion Sling Bag",
    description: "Compact futuristic sling bag.",
    price: 85,
    category: "Accessories",
    image: "/images/product16.jpg",
  },
  {
    name: "Eclipse Track Pants",
    description: "Streetwear essential with tech fit.",
    price: 90,
    category: "Jackets",
    image: "/images/product17.jpg",
  },
  {
    name: "Pulse Boots",
    description: "Tough terrain meets sleek design.",
    price: 170,
    category: "Footwear",
    image: "/images/product18.jpg",
  },
  {
    name: "Nova Socks Pack",
    description: "Comfortable and breathable.",
    price: 25,
    category: "Accessories",
    image: "/images/product19.jpg",
  },
  {
    name: "Phase Jacket",
    description: "Reversible and versatile.",
    price: 150,
    category: "Jackets",
    image: "/images/product20.jpg",
  },

  // Dynamically generate 30+ more
  ...Array.from({ length: 35 }).map((_, i) => ({
    name: `Custom Style ${i + 21}`,
    description: `Exclusive fashion piece #${i + 21}`,
    price: Math.floor(Math.random() * 150 + 50), // Price between 50 and 200
    category: ["Footwear", "Jackets", "Accessories"][i % 3],
    image: `/images/product${(i % 20) + 1}.jpg`, // Rotate 1-20 images
  })),
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("🌱 Products seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
};

seedDB();
