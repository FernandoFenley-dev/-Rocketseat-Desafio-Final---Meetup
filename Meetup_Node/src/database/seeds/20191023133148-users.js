const faker = require('faker');
const bcrypt = require('bcryptjs');

async function generateFakeItems(count) {
  faker.locale = 'pt_BR';

  const encryptedPassword = await bcrypt.hash('123456', 8);

  const users = [];
  let newUser = {
    name: 'User01',
    email: 'user01@meetup.com',
    password_hash: encryptedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };
  users.push(newUser);
  newUser = {
    name: 'User02',
    email: 'user02@meetup.com',
    password_hash: encryptedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };
  users.push(newUser);
  for (let i = 0; i < count; i += 1) {
    newUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: encryptedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    };
    users.push(newUser);
  }
  return users;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await generateFakeItems(5);
    return queryInterface.bulkInsert('users', users, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
