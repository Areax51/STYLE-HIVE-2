import express from "express";
const router = express.Router();

const products = [
  {
    name: "Cyber Jacket",
    category: "Menswear",
    price: 120,
    image: "https://via.placeholder.com/300x200?text=Jacket",
  },
  {
    name: "Futurist Glasses",
    category: "Accessories",
    price: 60,
    image: "https://via.placeholder.com/300x200?text=Glasses",
  },
  {
    name: "Neon Tracksuit",
    category: "Womenswear",
    price: 100,
    image: "https://via.placeholder.com/300x200?text=Tracksuit",
  },
  {
    name: "Space Boots",
    category: "Menswear",
    price: 150,
    image: "https://via.placeholder.com/300x200?text=Boots",
  },
  {
    name: "Silver Puffer",
    category: "Womenswear",
    price: 180,
    image: "https://via.placeholder.com/300x200?text=Puffer",
  },
];

router.post("/", (req, res) => {
  const { saved } = req.body;

  if (!saved || !Array.isArray(saved)) {
    return res.status(400).json({ error: "Saved products required" });
  }

  const categories = [...new Set(saved.map((item) => item.category))];

  const recommendations = products.filter(
    (p) =>
      categories.includes(p.category) && !saved.find((s) => s.name === p.name)
  );

  res.json(recommendations);
});

export default router;
