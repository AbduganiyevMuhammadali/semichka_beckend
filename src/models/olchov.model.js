const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class OlchovModel extends Model {}

OlchovModel.init({
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
  modelName: 'OlchovModel',
  tableName: 'olchov',
  timestamps: false,
  paranoid: true
});

module.exports = OlchovModel;