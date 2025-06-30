import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Adjust path if needed

dotenv.config();

const products = [
  {
    name: "Minimalist Linen Shirt",
    description:
      "Elevate your look with breathable fabrics and effortless cuts.",
    price: 48.75,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297538/Photo_Jun_17_2025_11_22_31_msycki.jpg",
  },
  {
    name: "Streetwear Cargo Pants",
    description: "Tailored yet relaxed – ideal for everyday urban fashion.",
    price: 68.42,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297539/Photo_Jun_17_2025_11_22_34_s7rybf.jpg",
  },
  {
    name: "Retro Windbreaker",
    description: "Vintage vibes with a modern twist, built for all seasons.",
    price: 113.87,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297537/Photo_Jun_17_2025_11_22_23_tsvi1p.jpg",
  },
  {
    name: "Sleek Satin Slip Dress",
    description: "Shimmer with elegance in this soft satin midi dress.",
    price: 89.99,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297535/Photo_Jun_17_2025_11_20_38_ivwu7u.jpg",
  },
  {
    name: "Oversized Black Hoodie",
    description: "Ultimate comfort meets edgy streetwear style.",
    price: 55.0,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297534/Photo_Jun_16_2025_11_25_58_1_z3w1qn.jpg",
  },
  {
    name: "Structured Leather Tote",
    description: "Carry chic with this premium vegan leather tote.",
    price: 102.5,
    category: "Accessories",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297534/Photo_Jun_16_2025_13_24_29_1_zfz2dy.jpg",
  },
  {
    name: "Double-Breasted Blazer",
    description: "Classic tailored blazer to sharpen your outfit.",
    price: 77.99,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297533/Photo_Jun_16_2025_11_25_58_vyoxuk.jpg",
  },
  {
    name: "Everyday White Sneakers",
    description: "Clean lines, ultimate comfort – the go-to pair.",
    price: 49.99,
    category: "Accessories",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297532/Photo_Jun_16_2025_10_33_13_z030yl.jpg",
  },
  {
    name: "Textured Knit Sweater",
    description: "Cozy knit with ribbed details in neutral tones.",
    price: 59.49,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297532/Photo_Jun_16_2025_09_19_45_rsu8ss.jpg",
  },
  {
    name: "High-Waisted Palazzo Pants",
    description: "Flowy elegance with flattering fit and wide hems.",
    price: 70.0,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297531/Photo_Jun_16_2025_13_24_29_kmalf4.jpg",
  },
  {
    name: "Silk Bandana Scarf",
    description: "Soft silk scarf with abstract prints for layering.",
    price: 22.0,
    category: "Accessories",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297529/Photo_Jun_16_2025_09_33_54_ty2eqx.jpg",
  },
  {
    name: "Puffer Vest Jacket",
    description: "Layer-ready utility vest for all seasons.",
    price: 65.5,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297528/Photo_Jun_16_2025_09_32_56_gqecsz.jpg",
  },
  {
    name: "Beige Cropped Hoodie",
    description: "Soft neutral cropped hoodie with minimal branding.",
    price: 38.75,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297527/Photo_Jun_16_2025_09_32_57_fzdtng.jpg",
  },
  {
    name: "Geometric Statement Blazer",
    description: "Make an entrance with bold structure and angles.",
    price: 110.0,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297526/Photo_Jun_16_2025_09_32_02_bym38m.jpg",
  },
  {
    name: "Denim Shirt Jacket",
    description: "Workwear-inspired denim shirt with a structured fit.",
    price: 60.0,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297525/Photo_Jun_25_2025_10_32_34_s0ha7i.jpg",
  },
  {
    name: "Wide-Leg Jeans",
    description: "Throwback Y2K jeans with low waist and relaxed fit.",
    price: 52.95,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297522/Photo_Jun_25_2025_14_52_27_ctt8ao.jpg",
  },
  {
    name: "Printed Mesh Turtleneck",
    description: "Breathable printed mesh for statement layering.",
    price: 45.25,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297522/Photo_Jun_26_2025_23_30_15_zs34dv.jpg",
  },
  {
    name: "Sleek Square Sunglasses",
    description: "UV-protected and effortlessly stylish eyewear.",
    price: 19.99,
    category: "Accessories",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297521/Photo_Jun_25_2025_14_52_31_g3xov0.jpg",
  },
  {
    name: "Knitted Two-Piece Set",
    description: "Matching comfort set for cozy and casual outings.",
    price: 80.0,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297519/Photo_Jun_26_2025_23_29_56_tmtzng.jpg",
  },
  {
    name: "Colorblock Street Jacket",
    description: "Bold tones stitched together in perfect symmetry.",
    price: 92.4,
    category: "Men",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297516/Photo_Jun_27_2025_13_57_54_psetwa.jpg",
  },
  {
    name: "Ribbed Knit Maxi Dress",
    description: "Flattering bodycon with stretch fit and bold hemline.",
    price: 77.3,
    category: "Women",
    image:
      "https://res.cloudinary.com/dprrszmjo/image/upload/v1751297512/Photo_Jun_27_2025_13_57_53_1_yahd60.jpg",
  },
  // Add more if needed (you have ~30 URLs)
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Database seeded with Cloudinary products!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
