const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const NalechniyItemModel = require('./nalechniy_item.model');
const PastavchikModel = require('./pastavchik.model');
const ValyutaModel = require('./valyuta.model');
const SkladModel = require('./sklad.model');
class NalechniyModel extends Model {}

NalechniyModel.init({
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
  modelName: 'NalechniyModel',
  tableName: 'nalechniy',
  timestamps: false,
  paranoid: true
});
NalechniyModel.hasMany(NalechniyItemModel, {as: 'nalechniy_item', foreignKey: 'doc_id'});
NalechniyModel.belongsTo(PastavchikModel, {as :'pastavchik', foreignKey: 'pastavchik_id'});
NalechniyModel.belongsTo(ValyutaModel, {as :'valyuta', foreignKey: 'valyuta_id'});
NalechniyModel.belongsTo(SkladModel, {as :'sklad', foreignKey: 'sklad_id'});
module.exports = NalechniyModel;