module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'subscriptions',
      [
        {
          meetup_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          meetup_id: 4,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('mesubscriptionsetups', null, {});
  },
};
