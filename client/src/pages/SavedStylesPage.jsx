// src/pages/SavedStylesPage.jsx
// -------------------------------------------------------------
// HANDOFF (Alex -> Team):
// Favorites page expects backend GET /favorites returning ARRAY OF PRODUCT DOCS.
// Removal uses productId (DELETE /favorites/:productId).
// Includes optimistic deletion + rollback & toast hooks.
// TODO (future): If we add metadata (date saved), refactor backend to return objects:
// { product: {...}, favoriteId, savedAt } and adjust UI.
// -------------------------------------------------------------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, RotateCw } from "lucide-react";
import { toast } from "react-toastify";
import { useFavorites } from "../context/FavoritesContext";

const SavedStylesPage = () => {
  const {
    favorites,
    loading,
    error,
    removeFromFavorites, // expects productId
    refetch, // ensure context exposes this; if not, add it
  } = useFavorites();

  const [pendingIds, setPendingIds] = useState(new Set());

  const handleRemove = async (productId) => {
    if (pendingIds.has(productId)) return;
    setPendingIds((prev) => new Set(prev).add(productId));

    // Optimistic toast
    const toastId = toast.loading("Removing…");

    try {
      await removeFromFavorites(productId);
      toast.update(toastId, {
        render: "Removed from favorites",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (e) {
      toast.update(toastId, {
        render: e?.response?.data?.msg || "Failed to remove",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setPendingIds((prev) => {
        const clone = new Set(prev);
        clone.delete(productId);
        return clone;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent tracking-wide">
            Saved Styles
          </h1>
          {favorites.length > 0 && (
            <button
              onClick={refetch}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
            >
              <RotateCw className="w-4 h-4" />
              Refresh
            </button>
          )}
        </header>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-400 space-y-4 py-20"
          >
            <p className="text-lg">No saved items yet.</p>
            <Link
              to="/products"
              className="inline-block px-5 py-2 rounded-lg border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
            >
              Browse styles
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((product) => {
                const isRemoving = pendingIds.has(product._id);
                return (
                  <motion.article
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="relative bg-neutral-900/60 backdrop-blur rounded-2xl border border-neutral-700 hover:border-yellow-400 shadow-lg overflow-hidden flex flex-col group"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-300.png";
                        }}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isRemoving && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col p-4 flex-1">
                      <h3 className="text-lg font-semibold text-yellow-300 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mt-auto flex gap-3">
                        <button
                          disabled={isRemoving}
                          onClick={() => handleRemove(product._id)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                            ${
                              isRemoving
                                ? "bg-red-800/60 text-red-200 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-500 text-white"
                            }`}
                        >
                          {isRemoving ? "Removing..." : "Remove"}
                        </button>
                        <Link
                          to={`/products/${product._id}`}
                          className="flex-1 py-2 rounded-lg text-sm font-medium text-center border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default SavedStylesPage;
