const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class Pay_typeModel extends Model {}

Pay_typeModel.init({
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
  modelName: 'Pay_typeModel',
  tableName: 'pay_type',
  timestamps: false,
  paranoid: true
});

module.exports = Pay_typeModel;