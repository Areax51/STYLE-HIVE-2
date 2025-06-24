const ProductCard = ({ product }) => {
  return (
    <div className="bg-black text-gold border border-gold rounded-2xl shadow-md p-4 hover:scale-105 transition-transform duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-4 border border-gold"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-base mb-2">{product.description}</p>
      <div className="text-lg font-bold">{product.price} USD</div>
    </div>
  );
};

export default ProductCard;
