const { body, validationResult, param } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createRestaurantValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('address').notEmpty().withMessage('Address cannot be empty'),
	body('rating').notEmpty().withMessage('Rating cannot be empty'),
]
const createMealValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('price')
		.notEmpty().withMessage('Price cannot be empty')
		.isNumeric().withMessage('Price must be a number'),
	checkResult,

]
const createOrderValidators = [
	body('quantity')
		.notEmpty().withMessage('Quantity cannot be empty')
		.isNumeric().withMessage('Quantity must be a number')
		.isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
	checkResult,
]
const createReviewValidators = [
	body('comment').notEmpty().withMessage('Comment cannot be empty'),
	body('rating')
		.notEmpty().withMessage('Rating cannot be empty')
		.isNumeric().withMessage('Rating must be a number'),
	checkResult,
]

module.exports = { createUserValidators  , createRestaurantValidators , createMealValidators , createOrderValidators , createReviewValidators };
