'use strict';

const { HOST_NAME, HOST_PORT, IMG_ROUTE } = require('../src/util/settings');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Posting, { foreignKey: 'posting' });
    }
  };
  Image.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    uri: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${HOST_NAME}:${HOST_PORT}/${IMG_ROUTE}/${this.id}.jpg`;
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate : DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};