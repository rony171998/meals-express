const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");

const { catchAsync } = require("../utils/catchAsync.util");

const createrestaurant = catchAsync(async (req, res, next) => {
    const { name , address } = req.body;

    const newrestaurant = await Restaurant.create({
        name,
        address,
    
    });

    res.status(201).json({
        status: "success",
        newrestaurant,
    });
});

const getAllrestaurant = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({  where: { status: 'active' },
        include: [
            {
                model: Review, include: { model: User },
            },
        ]
    });

    res.status(200).json({
        status: "success",
        restaurants,
    });
});

const getrestaurantById = catchAsync(async (req, res, next) => {
	const { restaurant } = req;

	res.status(200).json({
		status: 'success',
		restaurant,
	});
});

const updaterestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name ,address } = req.body;

    await restaurant.update({ name, address });

    res.status(200).json({ status: "success", restaurant });
});

const deleterestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: "deleted" });

    res.status(200).json({ status: "success" });
});

const postReview = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { userId, comment, rating } = req.body;

    const newReview = await Review.create({
        userId,
        restaurantId: restaurant.id,
        comment,
        rating,
    });
    await restaurant.update({
        rating: rating
    });

    res.status(200).json({ 
        status: "success", 
        newReview 
    });
});

const updateReviewById = catchAsync(async (req, res, next) => {
    const { review   } = req;
    const { comment ,rating } = req.body;

    await review.update({ comment, rating });


    res.status(200).json({ 
        status: "success",
        review, 
         
    });
});

const deleteReviewById = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: "deleted" });

    res.status(200).json({ status: "success" });
});

module.exports = {
    createrestaurant,
    getAllrestaurant,
    getrestaurantById,
    updaterestaurant,
    deleterestaurant,
    postReview,
    updateReviewById,
    deleteReviewById,
};
