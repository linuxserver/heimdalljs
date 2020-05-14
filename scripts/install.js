;(async () => {
  const fs = require('fs')
  const path = require('path')
  const inquirer = require('inquirer')
  const crypto = require('crypto')

  if (fs.existsSync(path.join(__dirname, '../.env'))) {
    console.error('The file .env already exists. Aborting installation.')
    process.exit(1)
  }

  const backendUrl = await inquirer.prompt({
    name: 'answer',
    type: 'input',
    message: 'Where will the API live?',
    default: '/'
  })

  const dbType = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'What database are you running?',
    default: 'sqlite',
    choices: ['sqlite', 'mysql']
  })

  let dbQuestions = []
  switch (dbType.answer) {
    case 'sqlite':
      dbQuestions = [
        {
          name: 'storage',
          type: 'input',
          message: 'Where do you want your database stored?',
          default: path.resolve(path.join(__dirname, '../app.db'))
        }
      ]
      break
    case 'mysql':
      dbQuestions = [
        {
          name: 'host',
          type: 'input',
          message: 'What is the database host?',
          default: 'localhost'
        },
        {
          name: 'port',
          type: 'input',
          message: 'What is the database port?',
          default: 3306
        },
        {
          name: 'database',
          type: 'input',
          message: 'What is the database name?',
          default: 'heimdall'
        },
        {
          name: 'username',
          type: 'input',
          message: 'What is the database username?',
          default: 'root'
        },
        {
          name: 'password',
          type: 'input',
          message: 'What is the database password?',
          default: 'root'
        }
      ]
      break
  }

  const dbInfo = await inquirer.prompt(dbQuestions)

  const config = {
    BACKEND_LOCATION: backendUrl.answer,
    JWT_SECRET: crypto
      .createHash('sha1')
      .update(new Date().valueOf().toString() + Math.random().toString())
      .digest('hex'),
    DB_TYPE: dbType.answer,
    DB_STORAGE: dbInfo.storage || '',
    DB_HOST: dbInfo.host || '',
    DB_PORT: dbInfo.port || '',
    DB_DATABASE: dbInfo.database || '',
    DB_USERNAME: dbInfo.username || '',
    DB_PASSWORD: dbInfo.password || ''
  }

  fs.writeFileSync(
    path.join(__dirname, '../.env'),
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join('\n')
  )
})()
