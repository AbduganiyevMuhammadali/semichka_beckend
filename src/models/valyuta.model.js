const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class ValyutaModel extends Model {}

ValyutaModel.init({
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
  modelName: 'ValyutaModel',
  tableName: 'valyuta',
  timestamps: false,
  paranoid: true
});

module.exports = ValyutaModel;