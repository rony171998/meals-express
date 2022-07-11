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
	protectUserAccount,
} = require('../middlewares/auth.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeal);

//mealsRouter.use(protectSession);

mealsRouter.post('/:id',restaurantExists, createMealValidators, createMeal);

mealsRouter.get('/:id',mealExists, getMealById);

mealsRouter.patch('/:id', mealExists, updateMeal);

mealsRouter.delete('/:id', mealExists, deleteMeal);

mealsRouter
	.use('/:id', mealExists)
	.route('/:id')
	.get(getMealById)
	.patch(protectUserAccount, updateMeal)
	.delete(protectUserAccount, deleteMeal);

module.exports = { mealsRouter };