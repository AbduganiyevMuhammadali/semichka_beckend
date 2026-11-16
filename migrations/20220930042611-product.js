"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "product",
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          olchov_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          group_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          brend_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          product_type_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          harakter_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          shtrix:{
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          img: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
          }
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
      await queryInterface.dropTable("product", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
