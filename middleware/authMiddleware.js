const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next ) {
  if ( req.method === 'OPTIONS' ) {
    next();
  }

  try {
    const token = req.headers.authorization
    if ( !token ) {
      res.status(403).json({ message: 'Do not authorised'});
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Do not authorised'})
  }
}