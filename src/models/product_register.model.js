const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const ProductModel = require('./product.model'); 
const SeriyaModel = require('./seriya.model');

class ProductRegisterModel extends Model {}

ProductRegisterModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    product_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    seriya_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    doc_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    count:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    doc_type:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    type:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }

}, {
  sequelize,
  modelName: 'product_register',
  tableName: 'product_register',
  timestamps: false,
  paranoid: true
});
ProductRegisterModel.belongsTo(SeriyaModel, {as :'seriya', foreignKey: 'seriya_id'});
// ProductRegisterModel.belongsTo(ProductModel, {as :'product', foreignKey: 'product_id'});

module.exports = ProductRegisterModel;