import express from "express";
const router = express.Router();

const dummyProducts = [
  {
    name: "Cyber Street Jacket",
    category: "Menswear",
    price: 129.99,
    image: "https://via.placeholder.com/300x200.png?text=Cyber+Jacket",
  },
  {
    name: "Futurist Sunglasses",
    category: "Accessories",
    price: 59.99,
    image: "https://via.placeholder.com/300x200.png?text=Sunglasses",
  },
  {
    name: "Neon Tracksuit",
    category: "Womenswear",
    price: 99.5,
    image: "https://via.placeholder.com/300x200.png?text=Tracksuit",
  },
];

router.get("/", (req, res) => {
  res.json(dummyProducts);
});

export default router;
