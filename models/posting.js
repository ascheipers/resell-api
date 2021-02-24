'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posting.belongsTo(models.User, { foreignKey: 'creator' });

      Posting.hasMany(models.Image, { as: 'images', foreignKey: 'posting' });
    }

    toJSON() {
      let attributes = Object.assign({}, this.get());

      delete attributes['location_street'];
      delete attributes['location_city'];
      delete attributes['location_country'];
      
      return attributes;
    }
  };
  Posting.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING(30),
    description: DataTypes.STRING(1000),
    category: DataTypes.STRING(30),
    location_street: DataTypes.STRING(50),
    location_city: DataTypes.STRING(50),
    location_country: DataTypes.STRING(50),
    location: {
      type: DataTypes.VIRTUAL,
      get() {
        return {
          street: this.location_street,
          city: this.location_city,
          country: this.location_country,
        };
      },
      set(value) {
        const requiredFields = ['street', 'city', 'country'];

        if (typeof(value) === 'object' && Object.keys(value).every(e => requiredFields.includes(e)))
        {
          this.location_street = value.street;
          this.location_city = value.city;
          this.location_country = value.country;
        }
        else
        {
          throw new Error('Location attribute does not contain all required fields (street, city and country).');
        }
      }
    },
    askingPrice: DataTypes.DECIMAL(7,2),
    deliveryType: DataTypes.ENUM('shipping', 'pickup'),
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
    modelName: 'Posting',
  });
  return Posting;
};