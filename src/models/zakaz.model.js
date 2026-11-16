const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const ZakazItemModel = require('./zakaz_item.model')
class ZakazModel extends Model {}
const ClientModel = require('./client.model');
const ValyutaModel = require('./valyuta.model');
const SkladModel = require('./sklad.model');
const AgentModel = require('./agent.model');
ZakazModel.init({
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
    client_id : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    agent_id : {
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
    }
}, {
  sequelize,
  modelName: 'ZakazModel',
  tableName: 'zakaz',
  timestamps: false,
  paranoid: true
});
ZakazModel.hasMany(ZakazItemModel, {as: 'zakaz_item', foreignKey: 'doc_id'})
ZakazModel.belongsTo(ClientModel, {as :'client', foreignKey: 'client_id'});
ZakazModel.belongsTo(ValyutaModel, {as :'valyuta', foreignKey: 'valyuta_id'});
ZakazModel.belongsTo(SkladModel, {as :'sklad', foreignKey: 'sklad_id'});
ZakazModel.belongsTo(AgentModel, {as :'agent', foreignKey: 'agent_id'});

module.exports = ZakazModel;