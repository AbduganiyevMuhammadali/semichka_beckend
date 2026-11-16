"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "vazvrad_postavchik",
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
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          sklad_id:{
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          postavchik_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          agent_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          dostavchik_id: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          valyuta_id: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
          },
          pay_type_id: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
          },
          summa:{
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          comment:{
            type: Sequelize.DataTypes.STRING(250),
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
      await queryInterface.dropTable("vazvrad_postavchik", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
