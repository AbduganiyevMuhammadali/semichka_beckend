"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "vazvrad_item",
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          doc_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
          },
          tovar: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false
          },
          count: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          price:{
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false
          },
          summa:{
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
      await queryInterface.dropTable("vazvrad_item", { transaction });

      transaction.commit();
    } catch (errors) {
      transaction.rollback();
      throw errors;
    }
  },
};
