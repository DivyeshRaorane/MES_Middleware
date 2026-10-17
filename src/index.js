require('dotenv').config();
const express = require('express');
const { jwtAuthMiddleware } = require('./middleware/auth');
const sapRoutes = require('./routes/sapRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Open route for authentication
app.use('/api/auth', authRoutes);

// Protect the API with JWT Auth
app.use('/api/sap/dev', jwtAuthMiddleware, sapRoutes);

// Direct route for production-order-create-release
const sapController = require('./controllers/sapController');
app.post('/production-order-create-release', sapController.productionOrderCreateRelease);
app.get('/production-order-create-release', sapController.productionOrderCreateRelease);

// Direct routes for production-order-qty-change
app.patch('/production-order-qty-change', sapController.productionOrderQtyChange);
app.post('/production-order-qty-change', sapController.productionOrderQtyChange);
app.patch('/production-order-qty-change/:orderNumber', sapController.productionOrderQtyChange);
app.post('/production-order-qty-change/:orderNumber', sapController.productionOrderQtyChange);


// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'RISEIntegration API is running.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
