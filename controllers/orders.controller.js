const { Order } = require('../models/order.model');

const {catchAsync} = require('../utils/catchAsync.util');

const createOrder = catchAsync(async (req, res, next) => {
	const { mealId, quantity ,userId } = req.body;

	const newOrder = await Order.create({
		mealId,
		quantity,
		userId,
		totalPrice: 0,
	});

	res.status(201).json({
		status: 'success',
		newOrder,
	});
});

const getAllOrder = catchAsync(async (req, res, next) => {
	const orders = await Order.findAll({
		
	});

	res.status(200).json({
		status: 'success',
		orders,
	});
});

const getOrderById = catchAsync(async (req, res, next) => {
	const { order } = req;

	res.status(200).json({
		status: 'success',
		order,
	});
});

const updateOrder = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'completed' });

	res.status(200).json({ status: 'success' });
});

const deleteOrder = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'cancelled' });
	
	res.status(200).json({ status: 'success' });
});

module.exports = {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
	getOrderById,
}