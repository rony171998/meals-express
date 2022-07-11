const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Restaurant } = require('./models/restaurant.model');
const { Order } = require('./models/order.model');
const { Meal } = require('./models/meal.model');
// Utils
const { db } = require('./utils/database.util');


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

	
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);
Review.belongsTo(Restaurant);
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);
Meal.hasOne(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal, { foreignKey: 'mealId' });
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));
	
	const PORT = process.env.PORT || 4000;
	const HOST = process.env.DB_HOST;
app.listen(PORT,HOST,  () => {
	console.log('Express app running!! on port '+PORT +' on port '+HOST);
});
