const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const {catchAsync} = require('../utils/catchAsync.util');

const createMeal = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name, price } = req.body;

	const newMeal = await Meal.create({
		name,
		price,
		restaurantId: id,
	});

	res.status(201).json({
		status: 'success',
		newMeal,
	});
});

const getAllMeal = catchAsync(async (req, res, next) => {
	const meals = await Meal.findAll({ where: { status: 'active' },
		include: [
			{
				model: Restaurant,
			},
		] });

	res.status(200).json({
		status: 'success',
		meals,
	});
});

const getMealById = catchAsync(async (req, res, next) => {
	const { meals } = req;		

	res.status(200).json({
		status: 'success',
		meals,
	});
});

const updateMeal = catchAsync(async (req, res, next) => {
	const { meals } = req;
	const { name,price } = req.body;

	await meals.update({ name,price });

	res.status(200).json({ status: 'success', meals });
});

const deleteMeal = catchAsync(async (req, res, next) => {
	const { meals } = req;

	await meals.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
    createMeal,
    getAllMeal,
    updateMeal,
    deleteMeal,
	getMealById,
}