const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class HarakterModel extends Model {}
HarakterModel.init({
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
  modelName: 'HarakterModel',
  tableName: 'harakter',
  timestamps: false,
  paranoid: true
});

module.exports = HarakterModel;