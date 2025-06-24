const ProductCard = ({ product }) => {
  return (
    <div className="bg-black border border-gold p-4 rounded-2xl shadow-lg hover:shadow-gold transition w-full max-w-xs">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold text-gold">{product.name}</h3>
      <p className="text-sm text-white mt-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gold font-bold">${product.price}</span>
        <button className="btn-gold">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
