const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class KassaRegisterModel extends Model {}

KassaRegisterModel.init({
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
    doc_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    doc_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    pay_type_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    pay_type : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summa : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    record_type:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    sklad_id:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    comment:{
        type: DataTypes.STRING,
        allowNull:true
    }

}, {
  sequelize,
  modelName: 'kassa_register',
  tableName: 'kassa_register',
  timestamps: false,
  paranoid: true
});

module.exports = KassaRegisterModel;