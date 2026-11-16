const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class AgentModel extends Model {}

AgentModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
  sequelize,
  modelName: 'AgentModel',
  tableName: 'agent',
  timestamps: false,
  paranoid: true
});

module.exports = AgentModel;