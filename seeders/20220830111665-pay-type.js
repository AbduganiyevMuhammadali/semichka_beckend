'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('pay_type', [
        {
            name: 'Naqd',
        },
        {
            name: 'Plastik',
        },
        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('pay_type', null, {});

    }
};
