const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
const User = sequelize.define('User', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(60), allowNull: false },
email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
passwordHash: { type: DataTypes.STRING(200), allowNull: false },
address: { type: DataTypes.STRING(400) },
role: {
type: DataTypes.ENUM('ADMIN', 'USER', 'OWNER'),
defaultValue: 'USER',
},
});
return User;
};