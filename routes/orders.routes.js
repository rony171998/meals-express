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
	protectOrderAccount,
} = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.get('/me', getAllOrder);

ordersRouter.use(protectSession);

ordersRouter.post('/', createOrderValidators, createOrder);

ordersRouter
	.use('/:id', orderExists)
	.route('/:id')
	.get(getOrderById)
	.patch(protectOrderAccount, updateOrder)
	.delete(protectOrderAccount, deleteOrder);

module.exports = { ordersRouter };