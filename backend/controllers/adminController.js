const { User, Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');


exports.dashboard = async (req, res) => {
const totalUsers = await User.count();
const totalStores = await Store.count();
const totalRatings = await Rating.count();
res.json({ totalUsers, totalStores, totalRatings });
};


exports.addUser = async (req, res) => {
const { name, email, password, address, role } = req.body;
// reuse validation from authController but simplified
const bcrypt = require('bcrypt');
const passwordHash = await bcrypt.hash(password, 10);
try {
const user = await User.create({ name, email, passwordHash, address, role });
res.json(user);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.listUsers = async (req, res) => {
const { q, role, sortBy = 'id', order = 'ASC', limit = 50, offset = 0 } = req.query;
const where = {};
if (q) {
where[Op.or] = [
{ name: { [Op.iLike]: `%${q}%` } },
{ email: { [Op.iLike]: `%${q}%` } },
{ address: { [Op.iLike]: `%${q}%` } },
];
}
if (role) where.role = role.toUpperCase();
const users = await User.findAll({ where, order: [[sortBy, order]], limit: parseInt(limit), offset: parseInt(offset) });
res.json(users);
};


exports.listStores = async (req, res) => {
const { q, sortBy = 'id', order = 'ASC', limit = 50, offset = 0 } = req.query;
const where = {};
if (q) where[Op.or] = [
{ name: { [Op.iLike]: `%${q}%` } },
{ address: { [Op.iLike]: `%${q}%` } },
];
// include rating aggregation
const stores = await Store.findAll({
where,
include: [{ model: Rating }],
order: [[sortBy, order]],
limit: parseInt(limit),
offset: parseInt(offset),
});
const withRating = stores.map(s => {
const ratings = s.Ratings || [];
const avg = ratings.length ? Math.round((ratings.reduce((a,b)=>a+b.value,0)/ratings.length) * 10) / 10 : null;
return { id: s.id, name: s.name, email: s.email, address: s.address, averageRating: avg };
});
res.json(withRating);
};