const {db , DataTypes} = require('../utils/database.util');

const Meal = db.define('meals',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId:{
        foreaningKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
});
module.exports = { Meal };