const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const PrixodItemModel = require('./prixod_item.model');
const PastavchikModel = require('./pastavchik.model');
const ValyutaModel = require('./valyuta.model');
const SkladModel = require('./sklad.model');
class PrixodModel extends Model {}

PrixodModel.init({
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
    date : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pastavchik_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    sklad_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    valyuta_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    pay_type_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    jammi_summa : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    jammi_skidka : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }, 
    rasxod : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
  sequelize,
  modelName: 'PrixodModel',
  tableName: 'prixod',
  timestamps: false,
  paranoid: true
});
PrixodModel.hasMany(PrixodItemModel, {as: 'prixod_item', foreignKey: 'doc_id'});
PrixodModel.belongsTo(PastavchikModel, {as :'pastavchik', foreignKey: 'pastavchik_id'});
PrixodModel.belongsTo(ValyutaModel, {as :'valyuta', foreignKey: 'valyuta_id'});
PrixodModel.belongsTo(SkladModel, {as :'sklad', foreignKey: 'sklad_id'});
module.exports = PrixodModel;