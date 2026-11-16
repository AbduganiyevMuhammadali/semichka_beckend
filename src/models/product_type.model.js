const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class ProductTypeModel extends Model {}

ProductTypeModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'ProductTypeModel',
  tableName: 'product_type',
  timestamps: false,
  paranoid: true
});

module.exports = ProductTypeModel;