'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('123456', 5);
    
    await queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        password: hashPassword,
        tabel: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        login: 'user',
        password: hashPassword,
        tabel: '654321',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 