let jwt = require('jsonwebtoken');

function verify(parameters, callback) {
  jwt.verify(parameters.token, global.application.getConfig().jwt.key, (error, verifiedJwt) => {
    callback({
      data: verifiedJwt
     });
  });
}

module.exports = { verify };


