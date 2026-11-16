'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('product', 'minimal', {
      type: Sequelize.FLOAT,
      allowNull: true, // veya false, sütunun boş geçilip geçilemeyeceği
    });
    await queryInterface.addColumn('product', 'img2', {
      type: Sequelize.STRING,
      allowNull: true, // veya false, sütunun boş geçilip geçilemeyeceği
    });
    await queryInterface.addColumn('product', 'kg', {
      type: Sequelize.FLOAT,
      allowNull: true, // veya false, sütunun boş geçilip geçilemeyeceği
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('product', 'minimal');    
  }
};
