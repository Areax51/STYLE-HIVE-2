import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

// Replace this with real fashion product data directly:
const products = [
  {
    name: "Sleek Midi Dress",
    description: "A sleek midi dress perfect for modern fashion enthusiasts.",
    price: 111.46,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-8017004357373?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455255",
    updatedAt: "2025-06-26T01:03:28.455263",
  },
  {
    name: "Bold Necklace",
    description: "A bold necklace perfect for modern fashion enthusiasts.",
    price: 113.39,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/2278/products/product-415.jpg",
    createdAt: "2025-06-26T01:03:28.455265",
    updatedAt: "2025-06-26T01:03:28.455267",
  },
  {
    name: "Retro Crossbody Bag",
    description:
      "A retro crossbody bag perfect for modern fashion enthusiasts.",
    price: 88.06,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/3391/products/product-893.jpg",
    createdAt: "2025-06-26T01:03:28.455269",
    updatedAt: "2025-06-26T01:03:28.455270",
  },
  {
    name: "Retro Crossbody Bag",
    description:
      "A retro crossbody bag perfect for modern fashion enthusiasts.",
    price: 88.06,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/3391/products/product-893.jpg",
    createdAt: "2025-06-26T01:03:28.455269",
    updatedAt: "2025-06-26T01:03:28.455270",
  },
  {
    name: "Chic Cotton Shirt",
    description: "A chic cotton shirt perfect for modern fashion enthusiasts.",
    price: 100.94,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-6919991419872?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455272",
    updatedAt: "2025-06-26T01:03:28.455274",
  },
  {
    name: "Urban Wristwatch",
    description: "A urban wristwatch perfect for modern fashion enthusiasts.",
    price: 28.96,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-4603576178075?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455275",
    updatedAt: "2025-06-26T01:03:28.455277",
  },
  {
    name: "Classic Bucket Hat",
    description: "A classic bucket hat perfect for modern fashion enthusiasts.",
    price: 113.98,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-3827626926179?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455280",
    updatedAt: "2025-06-26T01:03:28.455282",
  },
  {
    name: "Elegant Denim Jeans",
    description:
      "A elegant denim jeans perfect for modern fashion enthusiasts.",
    price: 115.24,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/9587/products/product-348.jpg",
    createdAt: "2025-06-26T01:03:28.455284",
    updatedAt: "2025-06-26T01:03:28.455286",
  },
  {
    name: "Minimalist Crop Top",
    description:
      "A minimalist crop top perfect for modern fashion enthusiasts.",
    price: 123.59,
    category: "Women",
    image:
      "https://cdn.shopify.com/s/files/1/files/4035/products/product-363.jpg",
    createdAt: "2025-06-26T01:03:28.455289",
    updatedAt: "2025-06-26T01:03:28.455291",
  },
  {
    name: "Classic Blazer",
    description: "A classic blazer perfect for modern fashion enthusiasts.",
    price: 101.34,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-2230585069965?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455293",
    updatedAt: "2025-06-26T01:03:28.455295",
  },
  {
    name: "Sleek Leather Jacket",
    description:
      "A sleek leather jacket perfect for modern fashion enthusiasts.",
    price: 23.78,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/5177/products/product-615.jpg",
    createdAt: "2025-06-26T01:03:28.455296",
    updatedAt: "2025-06-26T01:03:28.455298",
  },
  {
    name: "Retro Necklace",
    description: "A retro necklace perfect for modern fashion enthusiasts.",
    price: 119.71,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-2966419867516?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455300",
    updatedAt: "2025-06-26T01:03:28.455302",
  },
  {
    name: "Bold Leather Jacket",
    description:
      "A bold leather jacket perfect for modern fashion enthusiasts.",
    price: 51.55,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-9524239182682?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455303",
    updatedAt: "2025-06-26T01:03:28.455305",
  },
  {
    name: "Sleek Slim-fit Pants",
    description:
      "A sleek slim-fit pants perfect for modern fashion enthusiasts.",
    price: 32.33,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/1091/products/product-686.jpg",
    createdAt: "2025-06-26T01:03:28.455307",
    updatedAt: "2025-06-26T01:03:28.455308",
  },
  {
    name: "Elegant Sunglasses",
    description: "A elegant sunglasses perfect for modern fashion enthusiasts.",
    price: 110.68,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/4580/products/product-394.jpg",
    createdAt: "2025-06-26T01:03:28.455310",
    updatedAt: "2025-06-26T01:03:28.455312",
  },
  {
    name: "Classic Tank Dress",
    description: "A classic tank dress perfect for modern fashion enthusiasts.",
    price: 143.76,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-8902938573241?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455313",
    updatedAt: "2025-06-26T01:03:28.455315",
  },
  {
    name: "Chic Cotton Shirt",
    description: "A chic cotton shirt perfect for modern fashion enthusiasts.",
    price: 138.33,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-4395341177807?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455316",
    updatedAt: "2025-06-26T01:03:28.455318",
  },
  {
    name: "Classic Bucket Hat",
    description: "A classic bucket hat perfect for modern fashion enthusiasts.",
    price: 97.56,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-5354939694999?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455320",
    updatedAt: "2025-06-26T01:03:28.455322",
  },
  {
    name: "Urban Necklace",
    description: "A urban necklace perfect for modern fashion enthusiasts.",
    price: 76.43,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/5244/products/product-798.jpg",
    createdAt: "2025-06-26T01:03:28.455323",
    updatedAt: "2025-06-26T01:03:28.455325",
  },
  {
    name: "Minimalist Sunglasses",
    description:
      "A minimalist sunglasses perfect for modern fashion enthusiasts.",
    price: 80.35,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-6903568193803?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455327",
    updatedAt: "2025-06-26T01:03:28.455328",
  },
  {
    name: "Minimalist Bucket Hat",
    description:
      "A minimalist bucket hat perfect for modern fashion enthusiasts.",
    price: 70.47,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/5675/products/product-987.jpg",
    createdAt: "2025-06-26T01:03:28.455330",
    updatedAt: "2025-06-26T01:03:28.455332",
  },
  {
    name: "Urban Denim Jeans",
    description: "A urban denim jeans perfect for modern fashion enthusiasts.",
    price: 115.72,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/4927/products/product-629.jpg",
    createdAt: "2025-06-26T01:03:28.455333",
    updatedAt: "2025-06-26T01:03:28.455335",
  },
  {
    name: "Classic Sunglasses",
    description: "A classic sunglasses perfect for modern fashion enthusiasts.",
    price: 38.37,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-8246757014464?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455337",
    updatedAt: "2025-06-26T01:03:28.455338",
  },
  {
    name: "Urban Leather Jacket",
    description:
      "A urban leather jacket perfect for modern fashion enthusiasts.",
    price: 25.18,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/8371/products/product-126.jpg",
    createdAt: "2025-06-26T01:03:28.455340",
    updatedAt: "2025-06-26T01:03:28.455342",
  },
  {
    name: "Elegant Wristwatch",
    description: "A elegant wristwatch perfect for modern fashion enthusiasts.",
    price: 80.36,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-4957518122049?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455343",
    updatedAt: "2025-06-26T01:03:28.455345",
  },
  {
    name: "Retro Leather Jacket",
    description:
      "A retro leather jacket perfect for modern fashion enthusiasts.",
    price: 97.09,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-9483744040781?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455347",
    updatedAt: "2025-06-26T01:03:28.455348",
  },
  {
    name: "Bold Slim-fit Pants",
    description:
      "A bold slim-fit pants perfect for modern fashion enthusiasts.",
    price: 147.18,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-4843649802658?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455350",
    updatedAt: "2025-06-26T01:03:28.455351",
  },
  {
    name: "Minimalist Bucket Hat",
    description:
      "A minimalist bucket hat perfect for modern fashion enthusiasts.",
    price: 117.75,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-8436652013165?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455353",
    updatedAt: "2025-06-26T01:03:28.455355",
  },
  {
    name: "Sleek Denim Jeans",
    description: "A sleek denim jeans perfect for modern fashion enthusiasts.",
    price: 33.8,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-2599627521781?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455356",
    updatedAt: "2025-06-26T01:03:28.455358",
  },
  {
    name: "Minimalist Slim-fit Pants",
    description:
      "A minimalist slim-fit pants perfect for modern fashion enthusiasts.",
    price: 87.11,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/1218/products/product-221.jpg",
    createdAt: "2025-06-26T01:03:28.455360",
    updatedAt: "2025-06-26T01:03:28.455361",
  },
  {
    name: "Retro Tank Dress",
    description: "A retro tank dress perfect for modern fashion enthusiasts.",
    price: 26.08,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-6448698116982?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455363",
    updatedAt: "2025-06-26T01:03:28.455365",
  },
  {
    name: "Sleek Midi Dress",
    description: "A sleek midi dress perfect for modern fashion enthusiasts.",
    price: 37.22,
    category: "Women",
    image:
      "https://cdn.shopify.com/s/files/1/files/9577/products/product-595.jpg",
    createdAt: "2025-06-26T01:03:28.455366",
    updatedAt: "2025-06-26T01:03:28.455368",
  },
  {
    name: "Retro Crop Top",
    description: "A retro crop top perfect for modern fashion enthusiasts.",
    price: 73.56,
    category: "Women",
    image:
      "https://cdn.shopify.com/s/files/1/files/7506/products/product-835.jpg",
    createdAt: "2025-06-26T01:03:28.455370",
    updatedAt: "2025-06-26T01:03:28.455371",
  },
  {
    name: "Minimalist Blazer",
    description: "A minimalist blazer perfect for modern fashion enthusiasts.",
    price: 72.66,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-5958594616458?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455373",
    updatedAt: "2025-06-26T01:03:28.455374",
  },
  {
    name: "Sleek Wrap Skirt",
    description: "A sleek wrap skirt perfect for modern fashion enthusiasts.",
    price: 49.27,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-2699115948107?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455376",
    updatedAt: "2025-06-26T01:03:28.455378",
  },
  {
    name: "Minimalist Midi Dress",
    description:
      "A minimalist midi dress perfect for modern fashion enthusiasts.",
    price: 125.66,
    category: "Women",
    image:
      "https://cdn.shopify.com/s/files/1/files/6786/products/product-32.jpg",
    createdAt: "2025-06-26T01:03:28.455380",
    updatedAt: "2025-06-26T01:03:28.455382",
  },
  {
    name: "Elegant Leather Jacket",
    description:
      "A elegant leather jacket perfect for modern fashion enthusiasts.",
    price: 107.87,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1142206831510?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455383",
    updatedAt: "2025-06-26T01:03:28.455385",
  },
  {
    name: "Urban Bucket Hat",
    description: "A urban bucket hat perfect for modern fashion enthusiasts.",
    price: 74.95,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-7547356707561?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455387",
    updatedAt: "2025-06-26T01:03:28.455388",
  },
  {
    name: "Chic Leather Jacket",
    description:
      "A chic leather jacket perfect for modern fashion enthusiasts.",
    price: 80.58,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/1932/products/product-813.jpg",
    createdAt: "2025-06-26T01:03:28.455390",
    updatedAt: "2025-06-26T01:03:28.455392",
  },
  {
    name: "Minimalist Sunglasses",
    description:
      "A minimalist sunglasses perfect for modern fashion enthusiasts.",
    price: 106.12,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-7557064661459?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455393",
    updatedAt: "2025-06-26T01:03:28.455395",
  },
  {
    name: "Bold Wristwatch",
    description: "A bold wristwatch perfect for modern fashion enthusiasts.",
    price: 139.51,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/1141/products/product-607.jpg",
    createdAt: "2025-06-26T01:03:28.455397",
    updatedAt: "2025-06-26T01:03:28.455398",
  },
  {
    name: "Bold Crop Top",
    description: "A bold crop top perfect for modern fashion enthusiasts.",
    price: 45.8,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-4095722352967?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455400",
    updatedAt: "2025-06-26T01:03:28.455402",
  },
  {
    name: "Minimalist Bucket Hat",
    description:
      "A minimalist bucket hat perfect for modern fashion enthusiasts.",
    price: 90.19,
    category: "Accessories",
    image:
      "https://cdn.shopify.com/s/files/1/files/5885/products/product-65.jpg",
    createdAt: "2025-06-26T01:03:28.455404",
    updatedAt: "2025-06-26T01:03:28.455407",
  },
  {
    name: "Elegant Slim-fit Pants",
    description:
      "A elegant slim-fit pants perfect for modern fashion enthusiasts.",
    price: 70.27,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/6804/products/product-107.jpg",
    createdAt: "2025-06-26T01:03:28.455410",
    updatedAt: "2025-06-26T01:03:28.455414",
  },
  {
    name: "Chic Cotton Shirt",
    description: "A chic cotton shirt perfect for modern fashion enthusiasts.",
    price: 70.58,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/8136/products/product-977.jpg",
    createdAt: "2025-06-26T01:03:28.455417",
    updatedAt: "2025-06-26T01:03:28.455420",
  },
  {
    name: "Elegant Leather Jacket",
    description:
      "A elegant leather jacket perfect for modern fashion enthusiasts.",
    price: 70.62,
    category: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/files/2124/products/product-82.jpg",
    createdAt: "2025-06-26T01:03:28.455422",
    updatedAt: "2025-06-26T01:03:28.455425",
  },
  {
    name: "Classic Leather Jacket",
    description:
      "A classic leather jacket perfect for modern fashion enthusiasts.",
    price: 36.41,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-8278615576280?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455428",
    updatedAt: "2025-06-26T01:03:28.455431",
  },
  {
    name: "Chic Sunglasses",
    description: "A chic sunglasses perfect for modern fashion enthusiasts.",
    price: 27.54,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-3578247250867?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455434",
    updatedAt: "2025-06-26T01:03:28.455437",
  },
  {
    name: "Elegant Crossbody Bag",
    description:
      "A elegant crossbody bag perfect for modern fashion enthusiasts.",
    price: 65.02,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-8122740965036?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455440",
    updatedAt: "2025-06-26T01:03:28.455444",
  },
  {
    name: "Urban Denim Jeans",
    description: "A urban denim jeans perfect for modern fashion enthusiasts.",
    price: 83.13,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-8884427002225?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455446",
    updatedAt: "2025-06-26T01:03:28.455447",
  },
  {
    name: "Sleek Wrap Skirt",
    description: "A sleek wrap skirt perfect for modern fashion enthusiasts.",
    price: 136.28,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1718224274492?fit=crop&w=800&q=80",
    createdAt: "2025-06-26T01:03:28.455449",
    updatedAt: "2025-06-26T01:03:28.455451",
  },
  // 👇 Keep adding the rest of the product objects here, as they were
];

try {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("✅ Database seeded with fresh products!");
  process.exit();
} catch (err) {
  console.error("❌ Seed error:", err);
  process.exit(1);
}
