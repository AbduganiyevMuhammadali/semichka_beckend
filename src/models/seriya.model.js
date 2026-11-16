const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const ProductModel = require('./product.model');
class SeriyaModel extends Model {}

SeriyaModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    datetime : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    narxi : {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'SeriyaModel',
  tableName: 'seriya',
  timestamps: false,
  paranoid: true
});
// SeriyaModel.belongsTo(ProductModel, {as :'product', foreignKey: 'product_id'});
module.exports = SeriyaModel;