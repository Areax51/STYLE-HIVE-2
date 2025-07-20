// client/src/context/FavoritesContext.jsx
// -------------------------------------------------------------
// HANDOFF (Alex -> Team):
// Manages favorites as an array of PRODUCT documents (backend returns products).
// Removal & addition use productId (server expects productId).
// Provides: favorites, loading, error, refetch, addToFavorites(product),
// removeFromFavorites(productId), isFavorited(productId).
// Optimistic updates with rollback on failure.
// -------------------------------------------------------------
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api";
import { toast } from "react-toastify";

const FavoritesContext = createContext(null);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Track in-flight operations to prevent duplicate actions
  const pendingAdd = useRef(new Set());
  const pendingRemove = useRef(new Set());

  const refetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getFavorites();
      // Backend returns array of products
      setFavorites(Array.isArray(data) ? data : data?.favorites || []);
    } catch (e) {
      const msg = e?.response?.data?.msg || "Failed to load favorites";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isFavorited = useCallback(
    (productId) => favorites.some((p) => p._id === productId),
    [favorites]
  );

  const addToFavorites = useCallback(
    async (product) => {
      if (!product?._id) return;
      const id = product._id;

      if (isFavorited(id) || pendingAdd.current.has(id)) {
        toast.info("Already saved");
        return;
      }

      // Optimistic: add immediately
      setFavorites((prev) => [product, ...prev]);
      pendingAdd.current.add(id);

      try {
        const { data } = await addFavorite(id);
        // Replace optimistic product with authoritative server product (in case fields differ)
        setFavorites((prev) => {
          const without = prev.filter((p) => p._id !== id);
          // data is a product doc
          return [data || product, ...without];
        });
        toast.success("Added to favorites");
      } catch (e) {
        // Rollback
        setFavorites((prev) => prev.filter((p) => p._id !== id));
        const msg =
          e?.response?.data?.msg ||
          e?.normalizedMessage ||
          "Failed to add to favorites";
        toast.error(msg);
      } finally {
        pendingAdd.current.delete(id);
      }
    },
    [isFavorited]
  );

  const removeFromFavorites = useCallback(async (productId) => {
    if (!productId || pendingRemove.current.has(productId)) return;

    pendingRemove.current.add(productId);
    // Snapshot for rollback
    let snapshot;
    setFavorites((prev) => {
      snapshot = prev;
      return prev.filter((p) => p._id !== productId);
    });

    try {
      await removeFavorite(productId);
      // We let the page optionally show toast; do it here as unified:
      toast.info("Removed from favorites");
    } catch (e) {
      // Rollback
      setFavorites(snapshot);
      const msg =
        e?.response?.data?.msg ||
        e?.normalizedMessage ||
        "Failed to remove favorite";
      toast.error(msg);
    } finally {
      pendingRemove.current.delete(productId);
    }
  }, []);

  const value = {
    favorites,
    loading,
    error,
    refetch,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
