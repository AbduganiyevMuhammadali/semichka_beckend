const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class VazvradItemModel extends Model {}

VazvradItemModel.init({
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
        type: DataTypes.DECIMAL,
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
    summa : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'VazvradItemModel',
  tableName: 'vazvrad_item',
  timestamps: false,
  paranoid: true
});

module.exports = VazvradItemModel;