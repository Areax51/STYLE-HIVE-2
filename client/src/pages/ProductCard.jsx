const ProductCard = ({ product }) => {
  return (
    <div className="bg-black text-gold border border-gold rounded-2xl shadow-md p-4 hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-4 border border-gold"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-400 mb-3">{product.description}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold">{product.price} USD</span>
        {/* Optional Add-ons below */}
        {/* 
        <button className="text-xs bg-gold text-black px-3 py-1 rounded hover:bg-yellow-400">
          Try in AI
        </button> 
        */}
      </div>
    </div>
  );
};

export default ProductCard;
