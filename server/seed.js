import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Ensure correct relative path

dotenv.config();

const products = [
  {
    name: "ASOS DESIGN Slim Fit Oxford Shirt",
    description: "White slim-fit oxford shirt with button-down collar.",
    price: 34.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-slim-fit-oxford-shirt-in-white/205341872-1-white.jpg",
  },
  {
    name: "ASOS DESIGN Ultimate Slim Fit Long Sleeve Tee",
    description: "White long-sleeve slim-fit T-shirt in cotton.",
    price: 19.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-ultimate-slim-fit-t-shirt-with-long-sleeves-in-white/12451975-1-white.jpg",
  },
  {
    name: "ASOS DESIGN Slim Sateen Short Sleeve Shirt",
    description: "White slim-fit sateen short-sleeve shirt.",
    price: 29.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-slim-sateen-short-sleeve-shirt-in-white/205399382-1-white.jpg",
  },
  {
    name: "ASOS DESIGN Formal Poplin Slim Fit Shirt",
    description: "White formal poplin slim fit shirt with spread collar.",
    price: 29.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-formal-poplin-slim-fit-shirt-in-white/207562035-1-white.jpg",
  },
  {
    name: "ASOS DESIGN Slim Fit Mesh Shirt",
    description: "White sheer striped mesh shirt, slim fit.",
    price: 39.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-slim-fit-sheer-striped-mesh-shirt/207544550-1-white.jpg",
  },
  {
    name: "ASOS DESIGN Skinny Suit Blazer",
    description: "Black skinny fit suit blazer with peak lapels.",
    price: 89.99,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-skinny-fit-suit-blazer-in-black/12345678-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Leather Chelsea Boots",
    description: "Black leather Chelsea boots with elastic sides.",
    price: 120.0,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-leather-chelsea-boots/12345682-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Tapered Cargo Pants",
    description: "Beige tapered cargo pants with elasticated cuffs.",
    price: 52.0,
    category: "Men",
    image:
      "https://images.asos-media.com/products/asos-design-tapered-cargo-pants/12345689-1-beige.jpg",
  },
  // Women’s items
  {
    name: "ASOS DESIGN Bodycon Midi Dress",
    description: "Red bodycon midi dress with square neckline.",
    price: 49.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-bodycon-midi-dress-in-red/12345681-1-red.jpg",
  },
  {
    name: "ASOS Curve Floral Wrap Dress",
    description: "Floral wrap midi dress with flutter sleeves.",
    price: 60.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-curve-floral-wrap-midi-dress/12345680-1-floral.jpg",
  },
  {
    name: "ASOS DESIGN Faux Leather Biker Jacket",
    description: "Black faux leather biker jacket with zip details.",
    price: 78.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-faux-leather-biker-jacket/12345679-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Wide Leg Trousers",
    description: "Cream high-waisted wide-leg pleated trousers.",
    price: 55.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-wide-leg-trousers/12345683-1-cream.jpg",
  },
  {
    name: "ASOS DESIGN Crop Top Racerback",
    description: "Black racerback crop top.",
    price: 25.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-racer-back-crop-top-in-black/12345684-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Faux Fur Trim Parka",
    description: "Black parka with faux-fur trim hood.",
    price: 112.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-faux-fur-trim-parka-coat/12345690-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Slingback Heels",
    description: "Pink slingback heels with kitten heel.",
    price: 45.0,
    category: "Women",
    image:
      "https://images.asos-media.com/products/asos-design-kitten-heel-slingbacks/12345691-1-pink.jpg",
  },
  // Accessories (10 items)
  {
    name: "ASOS DESIGN Gold Hoop Earrings",
    description: "Chunky textured gold hoop earrings.",
    price: 12.99,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-textured-gold-hoop-earrings/12345685-1-gold.jpg",
  },
  {
    name: "ASOS DESIGN Mini Faux Leather Crossbody Bag",
    description: "Black mini crossbody with chain strap.",
    price: 38.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-mini-faux-leather-crossbody-bag/12345686-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Stone Cotton Bucket Hat",
    description: "Stone bucket hat with stitched brim.",
    price: 16.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-bucket-hat-in-stone/12345687-1-stone.jpg",
  },
  {
    name: "ASOS DESIGN Mixed Metal Chunky Rings",
    description: "Pack of chunky mixed-metal rings.",
    price: 20.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-mixed-metal-chunky-ring-pack/12345688-1-mixedmetal.jpg",
  },
  {
    name: "ASOS DESIGN Sunglasses Tinted Lenses",
    description: "Square-frame sunglasses with brown lenses.",
    price: 18.5,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-square-frame-sunglasses/12345692-1-brown.jpg",
  },
  {
    name: "ASOS DESIGN Leather Belt with Buckle",
    description: "Black leather belt with silver buckle.",
    price: 15.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-leather-belt-with-buckle/12345693-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Scarf Wrap",
    description: "Floral print oversized scarf.",
    price: 22.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-floral-print-scarf/12345694-1-floral.jpg",
  },
  {
    name: "ASOS DESIGN Baseball Cap",
    description: "Black cotton baseball cap with logo.",
    price: 12.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-cotton-baseball-cap/12345695-1-black.jpg",
  },
  {
    name: "ASOS DESIGN Silk Headband",
    description: "Colorful silk-print headband.",
    price: 14.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-silk-print-headband/12345696-1-multi.jpg",
  },
  {
    name: "ASOS DESIGN Leather Wallet",
    description: "Black faux leather bifold wallet.",
    price: 28.0,
    category: "Accessories",
    image:
      "https://images.asos-media.com/products/asos-design-faux-leather-wallet/12345697-1-black.jpg",
  },
];

// Add 27 more varied items to reach 50...
for (let i = 0; products.length < 50; i++) {
  products.push({
    name: `ASOS DESIGN Alternate Item ${i + 1}`,
    description: `Versatile ASOS product ${i + 1} for style.`,
    price: (30 + i).toFixed(2),
    category: i % 3 === 0 ? "Men" : i % 3 === 1 ? "Women" : "Accessories",
    image: `https://images.asos-media.com/products/asos-design-item-placeholder/${
      140000000 + i
    }-1.jpg`,
  });
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Database seeded with 50 ASOS-style products");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
