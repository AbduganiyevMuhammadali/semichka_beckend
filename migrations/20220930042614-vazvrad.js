"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "vazvrad",
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
          date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          klient: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          sklad:{
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          valyuta: {
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
      await queryInterface.dropTable("vazvrad", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
