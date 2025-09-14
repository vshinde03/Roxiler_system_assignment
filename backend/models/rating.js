const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
const Rating = sequelize.define('Rating', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
comment: { type: DataTypes.STRING(500) },
});
return Rating;
};