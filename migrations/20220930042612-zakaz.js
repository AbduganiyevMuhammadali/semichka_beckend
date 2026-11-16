"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "zakaz",
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
          client_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          agent_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          sklad_id:{
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
      await queryInterface.dropTable("zakaz", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
