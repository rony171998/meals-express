// Models
const { Meal } = require('../models/meal.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const mealExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meals = await Meal.findOne({ where: { id } });

	if (!meals) {
		return next(new AppError('meals not found', 404));
	}

	req.meals = meals;
	next();
});

module.exports = { mealExists };