import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // ✔ Correct path

dotenv.config();

// ✔ Pinterest-style product list
const products = [
  {
    name: "Feel sea early condition",
    description: "Win new sort color property. Why community ahead issue.",
    price: 130.85,
    category: "Accessories",
    image:
      "https://i.pinimg.com/564x/b7/90/7a/b7907a1fcace678afeb08ffb8c94b405.jpg",
  },
  {
    name: "Sign political teach",
    description: "Issue chair trial. Trouble heart often street trip PM great.",
    price: 49.27,
    category: "Women",
    image:
      "https://i.pinimg.com/564x/22/32/1f/22321f4bbbc2cc9fdb746c08a60bccef.jpg",
  },
  {
    name: "Sit who medical",
    description:
      "Drug that scene surface difficult view politics direction. Success above sort land.",
    price: 132.45,
    category: "Accessories",
    image:
      "https://i.pinimg.com/564x/b3/3e/e6/b33ee6bc9df934542a6ecb230438c3c3.jpg",
  },
  {
    name: "Great office wonder",
    description:
      "Education ability dream fast. Defense head spend reveal statement.",
    price: 33.48,
    category: "Women",
    image:
      "https://i.pinimg.com/564x/a4/45/b5/a445b5c0090a24fbc9f2ed28ff503c52.jpg",
  },
  {
    name: "Culture attention apply",
    description: "Possible air dream provide require.",
    price: 82.11,
    category: "Men",
    image:
      "https://i.pinimg.com/564x/12/30/aa/1230aa65b6fa2a3d84b13d69be2a589e.jpg",
  },
  {
    name: "Political become week",
    description: "Page within whatever difference worry goal.",
    price: 99.99,
    category: "Accessories",
    image:
      "https://i.pinimg.com/564x/0c/f9/af/0cf9af75b2825b8f6599477f464d728e.jpg",
  },
  {
    name: "Discover between brother",
    description: "Type reduce choose speak assume concern air evening.",
    price: 67.39,
    category: "Men",
    image:
      "https://i.pinimg.com/564x/b9/1e/0a/b91e0a2bdf79cf49bfaebfd2bfe7b305.jpg",
  },
  {
    name: "Glass cold economy",
    description: "Try feel century fly reality training investment.",
    price: 78.54,
    category: "Women",
    image:
      "https://i.pinimg.com/564x/0a/b1/22/0ab122ccf3342e0e83590e9e31d2a32a.jpg",
  },
  {
    name: "Citizen war successful",
    description: "Poor reveal manage want already return teacher message.",
    price: 53.17,
    category: "Men",
    image:
      "https://i.pinimg.com/564x/76/f9/c4/76f9c44c1d3b4d24ccfe4cf7990f1267.jpg",
  },
  {
    name: "Talk resource team",
    description:
      "Commercial situation measure board team toward minute everyone.",
    price: 61.23,
    category: "Accessories",
    image:
      "https://i.pinimg.com/564x/91/f1/8d/91f18d44eb0d7581a2c57b8167a99636.jpg",
  },
];

// Fill to 50 with varied Pinterest images
while (products.length < 50) {
  const extra = {
    name: fakeProductName(),
    description: fakeProductDesc(),
    price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
    category: ["Men", "Women", "Accessories"][products.length % 3],
    image: products[products.length % 10].image, // reuse known-good Pinterest URLs
  };
  products.push(extra);
}

function fakeProductName() {
  const adjectives = [
    "Soft",
    "Elegant",
    "Vintage",
    "Trendy",
    "Fitted",
    "Urban",
    "Classic",
  ];
  const items = [
    "Jacket",
    "Shirt",
    "Sneakers",
    "Pants",
    "Dress",
    "Blazer",
    "Bag",
  ];
  return `${randomFrom(adjectives)} ${randomFrom(items)}`;
}

function fakeProductDesc() {
  const starts = ["Perfect for", "Ideal for", "A stylish choice for"];
  const ends = ["everyday wear.", "special occasions.", "fashion lovers."];
  return `${randomFrom(starts)} ${randomFrom(ends)}`;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🌱 Seeder function
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Pinterest-style products seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
}

seed();
