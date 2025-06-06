import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const isSaved = cart.find((item) => item.name === product.name);

  return (
    <div className="bg-futuristic-gray rounded-2xl shadow-md p-4 flex flex-col text-white hover:scale-105 transition-transform duration-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gold text-sm">{product.category}</p>
      <p className="mt-1 font-bold">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className={`mt-3 px-4 py-2 rounded ${
          isSaved
            ? "bg-gray-600 text-white cursor-default"
            : "bg-gold text-black hover:bg-yellow-400"
        }`}
        disabled={isSaved}
      >
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default ProductCard;
