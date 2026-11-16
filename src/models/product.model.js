const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const OlchovModel = require('./olchov.model'); 
const BrendModel = require('./brend.model');
const GroupModel = require('./group.model');
const ProductTypeModel = require('./product_type.model');
const HarakterModel = require('./harakter.model');
const ProductRegisterModel = require('./product_register.model');
const SeriyaModel = require('./seriya.model');

class ProductModel extends Model {}

ProductModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    olchov_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    group_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    brend_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    product_type_id : {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    harakter_id : {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    shtrix : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    img : {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: ''
    },
    img2 : {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: ''
    },
    minimal : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kg : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  sequelize,
  modelName: 'product',
  tableName: 'product',
  timestamps: false,
  paranoid: true
});
ProductModel.belongsTo(OlchovModel, {as :'olchov', foreignKey: 'olchov_id'});
ProductModel.belongsTo(BrendModel, {as :'brend', foreignKey: 'brend_id'});
ProductModel.belongsTo(GroupModel, {as :'group', foreignKey: 'group_id'});
ProductModel.belongsTo(ProductTypeModel, {as :'product_type', foreignKey: 'product_type_id'});
ProductModel.belongsTo(HarakterModel, {as :'harakter', foreignKey: 'harakter_id'});
ProductModel.hasMany(ProductRegisterModel,{as:"pro_regis", foreignKey:'product_id'})
ProductRegisterModel.belongsTo(ProductModel, {as :'product', foreignKey: 'product_id'});
SeriyaModel.belongsTo(ProductModel, {as :'product', foreignKey: 'product_id'});
module.exports = ProductModel;