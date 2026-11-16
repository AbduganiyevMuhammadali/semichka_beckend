const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class VazvradPostavchikItemModel extends Model {}

VazvradPostavchikItemModel.init({
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
    tovar_id: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    // ostatka : {
    //     type: DataTypes.DECIMAL,
    //     allowNull: false,
    // },
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
  modelName: 'VazvradPostavchikItemModel',
  tableName: 'vazvrad_postavchik_item',
  timestamps: false,
  paranoid: true
});

module.exports = VazvradPostavchikItemModel;