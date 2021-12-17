'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .transaction(async (t) => {
        await queryInterface.addColumn(
          'users',
          'isBanned',
          { type: Sequelize.BOOLEAN, allowNull: true },
          { transaction: t }
        );
      })
      .then((res) => {
        return queryInterface.sequelize.transaction(async (t) => {
          await queryInterface.changeColumn('users', 'isBanned', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: true
          });
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('users', 'isBanned', {
        transaction: t
      });
    });
  }
};
