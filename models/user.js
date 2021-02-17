'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Posting, {as: 'postings'});
    }

    toJSON() {
      let attributes = Object.assign({}, this.get());

      delete attributes['password'];
      delete attributes['address_street'];
      delete attributes['address_city'];
      delete attributes['address_country'];
      
      return attributes;
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    alias: DataTypes.STRING(30),
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    address_street: DataTypes.STRING(50),
    address_city: DataTypes.STRING(50),
    address_country: DataTypes.STRING(50),
    address: {
      type: DataTypes.VIRTUAL,
      get() {
        return {
          street: this.address_street,
          city: this.address_city,
          country: this.address_country,
        };
      },
      set(value) {
        const requiredFields = ['street', 'city', 'country'];

        if (typeof(value) === 'object' && Object.keys(value).every(e => requiredFields.includes(e)))
        {
          this.address_street = value.street;
          this.address_city = value.city;
          this.address_country = value.country;
        }
        else
        {
          throw new Error('Address attribute does not contain all required fields (street, city and country).');
        }
      }
    },
    profilePicture: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hash(value));
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
    modelName: 'User',
  });
  return User;
};