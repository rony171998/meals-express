const express = require('express');


const {
	
	createOrder,
	getAllOrder,
	updateOrder,
	deleteOrder,
	getOrderById,
} = require('../controllers/orders.controller');


const {
	createOrderValidators
} = require('../middlewares/validators.middleware');
const { orderExists } = require('../middlewares/orders.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.get('/', getAllOrder);

//ordersRouter.use(protectSession);

ordersRouter.post('/', createOrderValidators, createOrder);

ordersRouter.get('/:id',orderExists, getOrderById);

ordersRouter.patch('/:id', orderExists, updateOrder);

ordersRouter.delete('/:id', orderExists, deleteOrder);

ordersRouter
	.use('/:id', orderExists)
	.route('/:id')
	.get(getOrderById)
	.patch(protectUserAccount, updateOrder)
	.delete(protectUserAccount, deleteOrder);

module.exports = { ordersRouter };