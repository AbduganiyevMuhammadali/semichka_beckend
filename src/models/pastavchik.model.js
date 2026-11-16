const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class PastavchikModel extends Model {}

PastavchikModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    tel : {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    inn : {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    mfo : {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    bank_card : {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
  sequelize,
  modelName: 'PastavchikModel',
  tableName: 'pastavchik',
  timestamps: false,
  paranoid: true
});

module.exports = PastavchikModel;