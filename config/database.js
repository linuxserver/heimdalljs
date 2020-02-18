require('./config')

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: 'dev.db',
    operatorsAliases: 0
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: 'test.db',
    operatorsAliases: 0
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_TYPE || 'sqlite',
    storage: process.env.DB_STORAGE || 'app.db',
    operatorsAliases: 0
  }
}
