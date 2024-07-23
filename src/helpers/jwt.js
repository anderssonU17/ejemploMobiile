const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user._id, 
        email: user.email,
    };
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
};

module.exports = {
    generateToken,
};
