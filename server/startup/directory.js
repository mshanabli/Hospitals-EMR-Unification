const fs = require('fs');

const dir = './uploads';

module.exports = () => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};
