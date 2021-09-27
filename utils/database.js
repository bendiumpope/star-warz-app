const Sequelize = require('sequelize');

const dataBaseString = require('./DataBaseHelper');


const [user, password, host, port, database] =
  dataBaseString.GetHerokuConnectionString(process.env.DATABASE_URL);

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        port: port,
        host: host,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize;