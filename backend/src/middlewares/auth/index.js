const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  const [, token] = authHeader.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, process.env.SECRET);
    req.userId = decode.id;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = verifyJWT;
