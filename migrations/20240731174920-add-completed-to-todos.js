'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add the `completed` column to the `todos` table.
     */
    await queryInterface.addColumn('todos', 'completed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Remove the `completed` column from the `todos` table.
     */
    await queryInterface.removeColumn('todos', 'completed');
  }
};
