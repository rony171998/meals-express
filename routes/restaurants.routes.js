const express = require('express');

const {
	
	getAllrestaurant,
	getrestaurantById,
	createrestaurant,
	updaterestaurant,
	deleterestaurant,
	postReview,
	deleteReviewById,
	updateReviewById,
	
} = require('../controllers/restaurants.controller');


const {
	createRestaurantValidators,
	createReviewValidators

} = require('../middlewares/validators.middleware');

const { restaurantExists } = require('../middlewares/restaurants.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');
const { orderExists } = require('../middlewares/orders.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllrestaurant);

restaurantsRouter.post('/', createRestaurantValidators, createrestaurant);

//restaurantsRouter.use(protectSession);

restaurantsRouter.post('/reviews/:id',restaurantExists ,createReviewValidators, postReview);

restaurantsRouter.patch('/reviews/:id', restaurantExists, updateReviewById);

restaurantsRouter.delete('/reviews/:id',restaurantExists, deleteReviewById);


restaurantsRouter
	.use('/:id', restaurantExists)
	.route('/:id')
	.get(getrestaurantById)
	.patch(protectUserAccount, updaterestaurant)
	.delete(protectUserAccount, deleterestaurant);

module.exports = { restaurantsRouter };