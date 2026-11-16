const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class VazvradClientItemModel extends Model {}

VazvradClientItemModel.init({
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
  modelName: 'VazvradClientItemModel',
  tableName: 'vazvrad_client_item',
  timestamps: false,
  paranoid: true
});

module.exports = VazvradClientItemModel;