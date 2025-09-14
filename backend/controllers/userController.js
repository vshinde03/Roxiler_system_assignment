const { User, Rating, Store } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Get logged-in user's profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'address', 'role'],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update profile (name, email, address)
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) {
      if (name.length < 20 || name.length > 60)
        return res.status(400).json({ message: 'Name must be 20–60 characters' });
      user.name = name;
    }

    if (email) user.email = email;
    if (address) {
      if (address.length > 400)
        return res.status(400).json({ message: 'Address too long' });
      user.address = address;
    }

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all ratings given by the user
 */
exports.myRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { userId: req.user.id },
      include: [{ model: Store, attributes: ['id', 'name', 'address'] }],
    });

    res.json(
      ratings.map(r => ({
        id: r.id,
        value: r.value,
        comment: r.comment,
        store: r.Store,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Change user password (alternative to authController changePassword if needed)
 */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Old password incorrect' });

    if (!newPassword || newPassword.length < 8 || newPassword.length > 16)
      return res.status(400).json({ message: 'New password must be 8–16 characters' });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
