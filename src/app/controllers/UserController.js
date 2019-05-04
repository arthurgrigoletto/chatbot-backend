/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const jwt = require('jsonwebtoken');

const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { phone, email } = req.body;

    if (await User.findOne({ phone })) {
      return res.status(400).json({ error: 'This Phone is already use' });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'This Email is already use' });
    }

    const user = await User.create(req.body);

    // Create JWT Payload
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    // Sign Token
    return jwt.sign(payload, process.env.APP_SECRET, {}, (err, token) => {
      res.json({
        token: `Bearer ${token}`,
      });
    });
  }
}

module.exports = new UserController();
