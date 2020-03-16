require('@babel/register');
const dotenv = require('dotenv');

dotenv.config();

const { LOGGING } = process.env;
const dialect = 'mysql';

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    logging: !!(LOGGING === 'true'),
    dialect
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};

// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
