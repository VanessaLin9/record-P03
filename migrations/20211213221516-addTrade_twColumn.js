'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
      'Trade_tws', 
      'passive', { 
      type: Sequelize.BOOLEAN,
      allowNull: false 
      })
    ]);
  },

  down: function (queryInterface, Sequelize) {
   return Promise.all([queryInterface.removeColumn('Trade_tws', 'passive') ]);
  }
};
