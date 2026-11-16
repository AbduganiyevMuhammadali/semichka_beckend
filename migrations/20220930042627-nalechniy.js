"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "nalechniy",
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
          pastavchik_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          sklad_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          valyuta_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          pay_type_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          jammi_summa:{
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          jammi_skidka:{
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          rasxod:{
            type: Sequelize.DataTypes.DECIMAL,
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
      await queryInterface.dropTable("nalechniy", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
