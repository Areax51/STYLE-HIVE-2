const fallbackProducts = [
  {
    _id: "sample1",
    name: "Neo Noir Hoodie 1",
    price: 120,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-77e0f6fdfb1f?auto=format&fit=crop&w=400&q=80",
    description: "Futuristic hoodie with neon trim.",
  },
  {
    _id: "sample2",
    name: "Gold Street Jacket 2",
    price: 183,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1600180758890-1f88560f92e6?auto=format&fit=crop&w=400&q=80",
    description: "A bold gold jacket for street fashion icons.",
  },
  {
    _id: "sample3",
    name: "Techwear Utility Pants 3",
    price: 137,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1602810318383-d319bfa1888b?auto=format&fit=crop&w=400&q=80",
    description: "Multi-pocket cargo pants built for style and function.",
  },
  {
    _id: "sample4",
    name: "Chrome Hoop Earrings 4",
    price: 109,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1632999041925-702ce8f8b0ee?auto=format&fit=crop&w=400&q=80",
    description: "Minimalist chrome hoops that elevate any outfit.",
  },
  {
    _id: "sample5",
    name: "Urban Rebel Sneakers 5",
    price: 115,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1593032457869-11c86f96f72f?auto=format&fit=crop&w=400&q=80",
    description: "Comfort meets streetwear in these high-top sneakers.",
  },
  {
    _id: "sample6",
    name: "Hologram Mini Bag 6",
    price: 56,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602810318199-fcf63416ccf3?auto=format&fit=crop&w=400&q=80",
    description: "A futuristic mini purse with holographic shine.",
  },
  {
    _id: "sample7",
    name: "Midnight Luxe Dress 7",
    price: 172,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1618354691267-c4d8892c9c53?auto=format&fit=crop&w=400&q=80",
    description: "Elegant and edgy dress with a luxury feel.",
  },
  {
    _id: "sample8",
    name: "Cyber Chain Accessory 8",
    price: 31,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1600180758890-f3f826c80282?auto=format&fit=crop&w=400&q=80",
    description: "A sleek silver chain for your cyber style.",
  },
  {
    _id: "sample9",
    name: "Velvet Storm Blazer 9",
    price: 198,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1618213837594-4be4dbfcaf7f?auto=format&fit=crop&w=400&q=80",
    description: "Dark velvet blazer for a sophisticated edge.",
  },
  {
    _id: "sample10",
    name: "Solar Flare Crop Top 10",
    price: 192,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1620138542055-fc188f1b5b64?auto=format&fit=crop&w=400&q=80",
    description: "Bright and bold top for summer city nights.",
  },
  {
    _id: "sample11",
    name: "Neo Noir Hoodie 11",
    price: 39,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602810318383-77e0f6fdfb1f?auto=format&fit=crop&w=400&q=80",
    description: "Futuristic hoodie with neon trim.",
  },
  {
    _id: "sample12",
    name: "Gold Street Jacket 12",
    price: 165,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1600180758890-1f88560f92e6?auto=format&fit=crop&w=400&q=80",
    description: "A bold gold jacket for street fashion icons.",
  },
  {
    _id: "sample13",
    name: "Techwear Utility Pants 13",
    price: 137,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1602810318383-d319bfa1888b?auto=format&fit=crop&w=400&q=80",
    description: "Multi-pocket cargo pants built for style and function.",
  },
  {
    _id: "sample14",
    name: "Chrome Hoop Earrings 14",
    price: 85,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1632999041925-702ce8f8b0ee?auto=format&fit=crop&w=400&q=80",
    description: "Minimalist chrome hoops that elevate any outfit.",
  },
  {
    _id: "sample15",
    name: "Urban Rebel Sneakers 15",
    price: 145,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1593032457869-11c86f96f72f?auto=format&fit=crop&w=400&q=80",
    description: "Comfort meets streetwear in these high-top sneakers.",
  },
  {
    _id: "sample16",
    name: "Hologram Mini Bag 16",
    price: 55,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602810318199-fcf63416ccf3?auto=format&fit=crop&w=400&q=80",
    description: "A futuristic mini purse with holographic shine.",
  },
  {
    _id: "sample17",
    name: "Midnight Luxe Dress 17",
    price: 129,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1618354691267-c4d8892c9c53?auto=format&fit=crop&w=400&q=80",
    description: "Elegant and edgy dress with a luxury feel.",
  },
  {
    _id: "sample18",
    name: "Cyber Chain Accessory 18",
    price: 92,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1600180758890-f3f826c80282?auto=format&fit=crop&w=400&q=80",
    description: "A sleek silver chain for your cyber style.",
  },
  {
    _id: "sample19",
    name: "Velvet Storm Blazer 19",
    price: 172,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1618213837594-4be4dbfcaf7f?auto=format&fit=crop&w=400&q=80",
    description: "Dark velvet blazer for a sophisticated edge.",
  },
  {
    _id: "sample20",
    name: "Solar Flare Crop Top 20",
    price: 160,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1620138542055-fc188f1b5b64?auto=format&fit=crop&w=400&q=80",
    description: "Bright and bold top for summer city nights.",
  },
  // ... and so on up to sample30
];

export default fallbackProducts;
