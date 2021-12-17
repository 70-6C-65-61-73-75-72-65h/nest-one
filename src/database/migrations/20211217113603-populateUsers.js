'use strict';
const populationAmount = 100;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await Promise.all(
        Array.from({ length: populationAmount }).map(async (_, index) => {
          const currentRowDate = Date.now();
          await queryInterface.sequelize.query(
            `
        insert into users (email, password, "createdAt", "updatedAt") 
        values ('kek_${index}@top.com', 'passwrod_${index}', to_timestamp(${currentRowDate} / 1000.0), to_timestamp(${currentRowDate} / 1000.0));
        `,
            {
              transaction: t
            }
          );
        })
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await Promise.all(
        Array.from({ length: populationAmount }).map(async (_, index) => {
          await queryInterface.sequelize.query(
            `delete from users where email='kek_${index}@top.com';`,
            {
              transaction: t
            }
          );
        })
      );
    });
  }
};
