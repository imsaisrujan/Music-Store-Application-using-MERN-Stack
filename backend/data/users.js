import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'adminguy@gmail.com',
    password: bcrypt.hashSync('1234560', 10),
    isAdmin: true,
  },
  {
    name: 'Luna Baby',
    email: 'luna@meow.com',
    password: bcrypt.hashSync('1234560', 10),
    isAdmin: false,
  },
  {
    name: 'Little Rascal',
    email: 'littlerascal@love.com',
    password: bcrypt.hashSync('1234560', 10),
    isAdmin: false,
  }
];

export default users;