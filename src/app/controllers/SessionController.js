/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const { telefone, password } = req.body;

    const user = await User.findOne({ telefone });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Create JWT Payload
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      telefone: user.telefone,
    };

    // Sign Token
    return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
    });
  }
}

module.exports = new SessionController();
