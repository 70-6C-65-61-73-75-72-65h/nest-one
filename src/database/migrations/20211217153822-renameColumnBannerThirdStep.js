'use strict';

module.exports = {
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .transaction(async (t) => {
        await queryInterface.addColumn(
          'users',
          'banned',
          { type: Sequelize.BOOLEAN, allowNull: true },
          { transaction: t }
        );
      })
      .then((res) => {
        return queryInterface.sequelize.transaction(async (t) => {
          await queryInterface.changeColumn('users', 'banned', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: true
          });
        });
      });
  },

  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('users', 'banned', {
        transaction: t
      });
    });
  }
};
