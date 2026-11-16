const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const VazvradClientItemModel = require('./vazvrad_client_item.model')
class VazvradClientModel extends Model {}
const ClientModel = require('./client.model');
const ValyutaModel = require('./valyuta.model');
const SkladModel = require('./sklad.model');
const DostavchikModel = require('./dostavchik.model');
const AgentModel = require('./agent.model');
VazvradClientModel.init({
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
    sklad_id : {
        type: DataTypes.DECIMAL,
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
    dostavchik_id : {
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
    summa : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    comment : {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'VazvradClientModel',
  tableName: 'vazvrad_client',
  timestamps: false,
  paranoid: true
});
VazvradClientModel.hasMany(VazvradClientItemModel, {as: 'vazvrad_client_item', foreignKey: 'doc_id'})
VazvradClientModel.belongsTo(ClientModel, {as :'client', foreignKey: 'client_id'});
VazvradClientModel.belongsTo(ValyutaModel, {as :'valyuta', foreignKey: 'valyuta_id'});
VazvradClientModel.belongsTo(SkladModel, {as :'sklad', foreignKey: 'sklad_id'});
VazvradClientModel.belongsTo(DostavchikModel, {as :'dostavchik', foreignKey: 'dostavchik_id'});
VazvradClientModel.belongsTo(AgentModel, {as :'agent', foreignKey: 'agent_id'});

module.exports = VazvradClientModel;