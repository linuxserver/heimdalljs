const { User } = require('../models/index')

test('Creates a user', async () => {
  await User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin'
  })

  expect((await User.findAll()).length).toBe(1)
})

test('Password check', async () => {
  const user = await User.findOne({
    where: {
      email: 'admin@example.com'
    }
  })

  expect(user.verifyPassword('admin')).toBe(true)
  expect(user.verifyPassword('wrong')).toBe(false)
})

test('Uniqueness of email', async () => {
  try {
    await User.create({
      username: 'test',
      email: 'admin@example.com',
      password: 'test'
    })
  } catch (e) {
    // Exception means user was unable to be created
  }

  expect((await User.findAll()).length).toBe(1)
})
