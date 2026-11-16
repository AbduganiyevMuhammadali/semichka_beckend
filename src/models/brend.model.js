const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class BrendModel extends Model {}

BrendModel.init({
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
  modelName: 'BrendModel',
  tableName: 'brend',
  timestamps: false,
  paranoid: true
});

module.exports = BrendModel;