router.get("/favorites", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.delete("/favorites/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites.pull(req.params.id);
    await user.save();
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});
