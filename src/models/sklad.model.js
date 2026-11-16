const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class SkladModel extends Model {}

SkladModel.init({
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
  modelName: 'SkladModel',
  tableName: 'sklad',
  timestamps: false,
  paranoid: true
});

module.exports = SkladModel;