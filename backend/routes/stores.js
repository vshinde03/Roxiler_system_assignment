const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
const Store = sequelize.define('Store', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(200), allowNull: false },
email: { type: DataTypes.STRING(120) },
address: { type: DataTypes.STRING(400) },
});
return Store;
};