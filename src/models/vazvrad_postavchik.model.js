const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const VazvradPostavchikItemModel = require('./vazvrad_postavchik_item.model')
class VazvradPostavchikModel extends Model {}
const PostavchikModel = require('./pastavchik.model');
const ValyutaModel = require('./valyuta.model');
const SkladModel = require('./sklad.model');
const DostavchikModel = require('./dostavchik.model');
const AgentModel = require('./agent.model');
VazvradPostavchikModel.init({
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
    postavchik_id : {
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
  modelName: 'VazvradPostavchikModel',
  tableName: 'vazvrad_postavchik',
  timestamps: false,
  paranoid: true
});
VazvradPostavchikModel.hasMany(VazvradPostavchikItemModel, {as: 'vazvrad_postavchik_item', foreignKey: 'doc_id'})
VazvradPostavchikModel.belongsTo(ValyutaModel, {as :'valyuta', foreignKey: 'valyuta_id'});
VazvradPostavchikModel.belongsTo(PostavchikModel, {as :'postavchik', foreignKey: 'postavchik_id'});
VazvradPostavchikModel.belongsTo(SkladModel, {as :'sklad', foreignKey: 'sklad_id'});
VazvradPostavchikModel.belongsTo(DostavchikModel, {as :'dostavchik', foreignKey: 'dostavchik_id'});
VazvradPostavchikModel.belongsTo(AgentModel, {as :'agent', foreignKey: 'agent_id'});

module.exports = VazvradPostavchikModel; 