const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class DostavchikModel extends Model {}

DostavchikModel.init({
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
  modelName: 'DostavchikModel',
  tableName: 'dostavchik',
  timestamps: false,
  paranoid: true
});

module.exports = DostavchikModel;