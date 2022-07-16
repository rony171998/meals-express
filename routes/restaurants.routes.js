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
	protectUserAdmin,
	protectUserAccountReview,
} = require('../middlewares/auth.middleware');
const { reviewExists } = require('../middlewares/reviews.middleware');

const restaurantsRouter = express.Router();



restaurantsRouter.post('/', createRestaurantValidators, createrestaurant);

restaurantsRouter.use(protectSession);

restaurantsRouter.get('/', getAllrestaurant);

restaurantsRouter.post('/reviews/:id',restaurantExists ,createReviewValidators, postReview);

restaurantsRouter.patch('/reviews/:id', reviewExists, protectUserAccountReview , updateReviewById);

restaurantsRouter.delete('/reviews/:id',reviewExists, protectUserAccountReview ,deleteReviewById);


restaurantsRouter
	.use('/:id', restaurantExists)
	.route('/:id')
	.get(getrestaurantById)
	.patch(protectUserAdmin, updaterestaurant)
	.delete(protectUserAdmin, deleterestaurant);

module.exports = { restaurantsRouter };