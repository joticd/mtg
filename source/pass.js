
var salt = require('../config').salt;

module.exports = function (u, p) {
  return require('crypto')
    .createHash('sha512')
    .update(u + salt + p)
    .digest('hex');
};