import express from 'express'
const router = express.Router()
const userCarts = {} // Temporary storage before DB integration

// Add product to cart
router.post('/add', (req, res) => {
  const { userId, product } = req.body
  if (!userCarts[userId]) userCarts[userId] = []
  userCarts[userId].push(product)
  res.json({ message: 'Added to cart', cart: userCarts[userId] })
})

// View user cart
router.get('/:userId', (req, res) => {
  res.json(userCarts[req.params.userId] || [])
})

export default router