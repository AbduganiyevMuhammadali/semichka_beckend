const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class NalechniyItemModel extends Model {}

NalechniyItemModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    doc_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true
    },
    tovar : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    count : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    price : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    skidka : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    summa : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'NalechniyItemModel',
  tableName: 'nalechniy_item',
  timestamps: false,
  paranoid: true
});

module.exports = NalechniyItemModel;