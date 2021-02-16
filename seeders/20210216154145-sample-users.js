'use strict';
const { hash } = require('../src/util/hash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', 
      [
        {
          alias: 'john98',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          address_street: 'Bulevardi 1',
          address_city: 'Helsinki',
          address_country: 'Finland',
          profilePicture: 'https://dummyimage.com/50x50/000/fff',
          password: await hash('1234'),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
