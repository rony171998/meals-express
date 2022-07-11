const {db , DataTypes} = require('../utils/database.util');

const Restaurant = db.define('restaurants',
{
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
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
    }
);
module.exports = { Restaurant };