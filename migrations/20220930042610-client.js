"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "client",
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          firma_name: {
            type: Sequelize.DataTypes.STRING(25),
            allowNull: false
          },
          lat: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          long: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          tel: {
            type: Sequelize.DataTypes.STRING(14),
            allowNull: false
          },
          name: {
            type: Sequelize.DataTypes.STRING(25),
            allowNull: false
          },
          inn: {
            type: Sequelize.DataTypes.STRING(25),
            allowNull: false
          },
          mfo: {
            type: Sequelize.DataTypes.STRING(25),
            allowNull: false
          },
          bank_card: {
            type: Sequelize.DataTypes.STRING(25),
            allowNull: false
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
      await queryInterface.dropTable("client", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
