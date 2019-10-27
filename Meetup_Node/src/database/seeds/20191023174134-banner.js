module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banners',
      [
        {
          name: 'image1.jpg',
          path: 'bc983d13da6cbb4cd6f522445c0a461b.jpg',
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          name: 'image2.jpg',
          path: '181897838648c548bbeb5eef8e4cd55e.jpg',
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          name: 'image3.jpg',
          path: 'f95499be85b334ad8e976a6dc1db2b3d.jpg',
          updated_at: new Date(),
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banners', null, {});
  },
};
