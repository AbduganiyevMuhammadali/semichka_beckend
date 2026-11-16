"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "kassa_register",
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          datetime: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          doc_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          doc_type:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          pay_type_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          pay_type:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          summa:{
            type:Sequelize.DataTypes.DECIMAL,
            allowNull:false
          },
          record_type:{
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false
          },
          kassa_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          sklad_id: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          comment:{
            type: Sequelize.DataTypes.STRING,
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
      await queryInterface.dropTable("kassa_register", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
