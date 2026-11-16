"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "product_register",
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          product_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          seriya_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          count:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
          },
          doc_type:{
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false
          },
          type:{
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false
          },
          doc_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
        },
        { transaction }
      );

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("product_register", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
