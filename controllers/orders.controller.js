const { Order } = require('../models/order.model');
const { Meal }= require('../models/meal.model');

const {catchAsync} = require('../utils/catchAsync.util');

const createOrder = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;
	const { mealId, quantity  } = req.body;

	const meal = await Meal.findOne({ where: { id: mealId } });

	const newOrder = await Order.create({
		mealId,
		quantity,
		userId : sessionUser.id,
		totalPrice: meal.price * quantity,
	});

	res.status(201).json({
		status: 'success',
		newOrder,
	});
});

const getAllOrder = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	console.log(sessionUser);

	const orders = await Order.findAll({
		where: { userId: sessionUser.id , status: 'active' },
	});

	res.status(200).json({
		status: 'success',
		orders,
	});
});

const getOrderById = catchAsync(async (req, res, next) => {
	const { order  } = req;

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