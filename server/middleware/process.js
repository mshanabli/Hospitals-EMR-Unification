const fs = require('fs');
const { parse } = require('fast-csv');

module.exports = (req, res, next) => {
  fs.createReadStream(req.file.path)
    .pipe(parse({ headers: true }))
    .on('data', row => {
      // process csv file data...
    })
    .on('end', () => {
      fs.unlink(req.file.path);
    })
    .on('error', err => {
      next(err);
    });
};
