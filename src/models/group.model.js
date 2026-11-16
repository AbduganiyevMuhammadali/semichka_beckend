const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class GroupModel extends Model {}

GroupModel.init({
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
  modelName: 'GroupModel',
  tableName: 'group',
  timestamps: false,
  paranoid: true
});

module.exports = GroupModel;