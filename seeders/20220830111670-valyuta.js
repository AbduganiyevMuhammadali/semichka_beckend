'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('valyuta', [
        {
            name: "So'm",
        },
        {
            name: 'Dollar',
        },
        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('valyuta', null, {});

    }
};
