
const Pg = require('pg').Pool;
const pg = new Pg({
  user: 'postgres',
  host: 'localhost',
  database: 'user_database',
  password: 'myPassword',
  port: 5432,
})
module.exports = pg;
