import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authenticateToken from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authenticateToken,placeOrder)
orderRouter.post('/stripe',authenticateToken,placeOrderStripe)
orderRouter.post('/razorpay',authenticateToken,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authenticateToken,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authenticateToken, verifyStripe)
orderRouter.post('/verifyRazorpay',authenticateToken, verifyRazorpay)

export default orderRouter