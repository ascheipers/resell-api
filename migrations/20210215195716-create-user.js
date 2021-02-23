'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      alias: {
        unique: true,
        type: Sequelize.STRING(30)
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      email: {
        unique: true,
        type: Sequelize.STRING(100)
      },
      address_street: {
        type: Sequelize.STRING(50)
      },
      address_city: {
        type: Sequelize.STRING(50)
      },
      address_country: {
        type: Sequelize.STRING(50)
      },
      profilePicture: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	      onUpdate : Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
};