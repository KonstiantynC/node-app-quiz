const jwt = require('jsonwebtoken');
const { secret } = require('../config');


module.exports = function(roles) {
  return function(req, res, next) {
    if ( req.method === 'OPTIONS' ) {
      next();
    }
  
    try {
      const token = req.headers.authorization
      if ( !token ) {
        res.status(403).json({ message: 'Do not authorised'});
      }
      const { roles: userRoles } = jwt.verify( token, secret );
      let hashRole = false;
      userRoles.forEach( role => {
        if ( roles.includes( role ) ) {
          hashRole = true;
        }
      });
      if( !hashRole ) {
        res.status(403).json({ message: 'Do not available'});
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Do not authorised'})
    }
  }
}