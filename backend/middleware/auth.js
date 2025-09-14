const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');


module.exports = async function (req, res, next) {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'Missing token' });
const token = header.split(' ')[1];
try {
const payload = jwt.verify(token, config.jwtSecret);
const user = await User.findByPk(payload.id);
if (!user) return res.status(401).json({ message: 'Invalid token' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
};