'use strict';

const batchSize = 100;

const updateByBatches = (queryInterface, updateTransaction) => {
  return queryInterface.sequelize
    .transaction(
      async (t) =>
        (
          await queryInterface.sequelize.query(`
        SELECT MAX(id)
        FROM users;`)
        )?.[0]?.[0]?.max
    )
    .then((maximalRowId) => {
      if (!maximalRowId) throw new Error('There is no rows in table to update');
      let idMin = 1;
      const batches = [];

      for (let idMax = batchSize; idMax < maximalRowId; idMax += batchSize) {
        batches.push({ min: idMin, max: idMax });
        idMin += batchSize;
      }
      batches.push({ min: idMin, max: maximalRowId });

      return updateTransaction(batches);
    });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return updateByBatches(queryInterface, (batches) =>
      queryInterface.sequelize.transaction(async (t) => {
        await Promise.all(
          batches.map(async (batch) => {
            await queryInterface.sequelize.query(
              `
              UPDATE users 
              SET "isBanned" = banned 
              WHERE id BETWEEN ${batch.min} and ${batch.max};`,
              { transaction: t }
            );
          })
        );
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    return updateByBatches(queryInterface, (batches) =>
      queryInterface.sequelize.transaction(async (t) => {
        await Promise.all(
          batches.map(async (batch) => {
            await queryInterface.sequelize.query(
              `
              UPDATE users 
              SET "isBanned" = NULL
              WHERE id BETWEEN ${batch.min} and ${batch.max};`,
              { transaction: t }
            );
          })
        );
      })
    );
  }
};
