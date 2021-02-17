'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Postings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      creator: {
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING(30)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      category: {
        type: Sequelize.STRING(30)
      },
      location_street: {
        type: Sequelize.STRING(50)
      },
      location_city: {
        type: Sequelize.STRING(50)
      },
      location_country: {
        type: Sequelize.STRING(50)
      },
      askingPrice: {
        type: Sequelize.DECIMAL(7,2),
      },
      deliveryType: {
        type: Sequelize.ENUM('shipping', 'pickup')
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
    await queryInterface.dropTable('Postings');
  }
};