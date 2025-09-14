const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');


exports.signup = async (req, res) => {
const { name, email, password, address, role } = req.body;
if (!name || name.length < 20 || name.length > 60)
return res.status(400).json({ message: 'Name must be 20-60 characters' });
if (!password || password.length < 8 || password.length > 16)
return res.status(400).json({ message: 'Password must be 8-16 chars' });
const passwordHash = await bcrypt.hash(password, 10);
try {
const user = await User.create({ name, email, passwordHash, address, role });
return res.json({ id: user.id, email: user.email });
} catch (err) {
return res.status(400).json({ message: err.message });
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '8h' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};


exports.changePassword = async (req, res) => {
const { oldPassword, newPassword } = req.body;
const user = req.user;
const ok = await bcrypt.compare(oldPassword, user.passwordHash);
if (!ok) return res.status(400).json({ message: 'Old password incorrect' });
if (!newPassword || newPassword.length < 8 || newPassword.length > 16)
return res.status(400).json({ message: 'New password must be 8-16 chars' });
user.passwordHash = await bcrypt.hash(newPassword, 10);
await user.save();
res.json({ message: 'Password updated' });
};