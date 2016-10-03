'use strict';

const fs = require('fs');

module.exports = function(req, res, next){
  if (!req.file) return next(new Error('bad request no file'));

  if (!req.file.path) return next(new Error('bad request no file'));

  let fileStream = fs.createReadStream(req.file.path);
  req.fileStream = fileStream;
  next();
};
