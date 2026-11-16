const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class ClientModel extends Model {}

ClientModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    firma_name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lat : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    long : {
        type: DataTypes.STRING(50),
        allowNull: false,
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
        allowNull: false,
    },
    mfo : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    bank_card : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
  sequelize,
  modelName: 'ClientModel',
  tableName: 'client',
  timestamps: false,
  paranoid: true
});

module.exports = ClientModel;