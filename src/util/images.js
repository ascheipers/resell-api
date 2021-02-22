const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function storeImage(buffer, location) {
  const id = uuidv4();

  fs.writeFileSync(path.join(location, id + '.jpg'), buffer, { flag: 'wx' }, err => {
    if (err) {
      throw err;
    }
  });

  return id;
}

exports.storeImage = storeImage;