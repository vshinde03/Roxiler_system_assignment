const { Store, Rating, User } = require('../models');


exports.createStore = async (req, res) => {
const { name, email, address, ownerId } = req.body;
const store = await Store.create({ name, email, address, ownerId });
res.json(store);
};


exports.listStoresPublic = async (req, res) => {
const stores = await Store.findAll({ include: [{ model: Rating }] });
const out = stores.map(s => {
const ratings = s.Ratings || [];
const avg = ratings.length ? Math.round((ratings.reduce((a,b)=>a+b.value,0)/ratings.length) * 10) / 10 : null;
return { id: s.id, name: s.name, address: s.address, averageRating: avg };
});
res.json(out);
};


exports.submitRating = async (req, res) => {
const { storeId } = req.params;
const { value } = req.body;
const userId = req.user.id;
if (!value || value < 1 || value > 5) return res.status(400).json({ message: 'Rating must be 1-5' });
// Check i

}