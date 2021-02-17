'use strict';

const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await models.User.findOne();
    return await queryInterface.bulkInsert('Postings', 
    [
      {
        creator: user.dataValues.id,
        title: 'Old Bike',
        description: 'Old bike of my son for sale. Good condition!',
        category: 'bikes',
        location_street: 'Bulevardi 1',
        location_city: 'Helsinki',
        location_country: 'Finland',
        askingPrice: 25.02,
        deliveryType: 'pickup'
      },
    ],
    {}
  );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Postings', null, {});
  }
};
