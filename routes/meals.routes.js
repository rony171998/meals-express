const express = require('express');


const {
	
	createMeal,
	getAllMeal,
	updateMeal,
	deleteMeal,
	getMealById,
} = require('../controllers/meals.controller');


const {
	createMealValidators
} = require('../middlewares/validators.middleware');
const { mealExists } = require('../middlewares/meals.middleware');
const {
	protectSession,
	protectUserAdmin,
} = require('../middlewares/auth.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id',restaurantExists, createMealValidators, createMeal);

mealsRouter
	.use('/:id', mealExists)
	.route('/:id')
	.get(getMealById)
	.patch(protectUserAdmin, updateMeal)
	.delete(protectUserAdmin, deleteMeal);

module.exports = { mealsRouter };