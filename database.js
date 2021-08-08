var Pg = require('pg').Pool;
var pg = new Pg({
    user: 'postgres',
    host: 'localhost',
    database: 'user_database',
    password: 'myPassword',
    port: 5432
});
module.exports = pg;
// credentials of database
// const env = require('./env');
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(env.database, env.user, env.password, {
//   host: env.host,
//   dialect: env.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: env.max,
//     min: env.pool.min,
//     acquire: env.pool.acquire,
//     idle: env.pool.idle
//   }
// });
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.users = require('./model')(sequelize, Sequelize);
// module.exports=db;
