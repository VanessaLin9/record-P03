'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trade_tw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trade_tw.init({
    price: DataTypes.NUMBER,
    share: DataTypes.INTEGER,
    fee: DataTypes.NUMBER,
    tax: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Trade_tw',
  });
  return Trade_tw;
};