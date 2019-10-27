const faker = require('faker');
const addDays = require('date-fns/addDays');
const addHours = require('date-fns/addHours');

module.exports = {
  up: (queryInterface, Sequelize) => {
    faker.locale = 'pt_BR';
    return queryInterface.bulkInsert(
      'meetups',
      [
        {
          date: '2019-05-15 08:00:00+00',
          title: 'Evento de C#',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 1,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: '2019-08-15 11:00:00+00',
          title: 'Evento de Phython',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 2,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: '2019-12-28 19:00:00+00',
          title: 'Evento de SQL',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 3,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: '2019-12-15 20:00:00+00',
          title: 'Evento de MongoDB',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 1,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(new Date(), 1),
          title: 'Evento de GraphQL',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 2,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(new Date(), 2),
          title: 'Evento de Postgree',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 3,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(new Date(), 3),
          title: 'Evento de AWS',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 1,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(new Date(), 4),
          title: 'Evento de OracleDB',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 2,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addDays(new Date(), 1),
          title: 'Evento de SQLServer',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 3,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(addDays(new Date(), 1), 1),
          title: 'Evento de C++',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 1,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(addDays(new Date(), 1), 2),
          title: 'Evento de ReactNative',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 2,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: addHours(addDays(new Date(), 1), 3),
          title: 'Evento de ReactJS',
          description: faker.lorem.paragraphs(),
          locale: faker.address.streetAddress(),
          banner_id: 3,
          owner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('meetups', null, {});
  },
};
