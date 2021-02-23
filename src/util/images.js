const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const models = require('../../models');

async function storeImage(buffer, location) {
  // TODO: verify is image

  const dbImage = models.Image.build({});

  await fs.writeFile(path.join(location, dbImage.id + '.jpg'), buffer, { flag: 'wx' }, err => {
    if (err) {
      throw err;
    }
  });

  await dbImage.save();

  return dbImage.id;
}

exports.storeImage = storeImage;