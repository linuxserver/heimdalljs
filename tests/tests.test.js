const { User, Item, Tag } = require('../models/index')

beforeAll(async () => {
  await User.destroy({ where: {} })
  await Tag.destroy({ where: {} })
})

test('Creates a user', async () => {
  const user = await User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin'
  })

  expect(user.username).toBe('admin')
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

test('Add/delete new item', async () => {
  const user = await User.findOne({
    where: {
      email: 'admin@example.com'
    }
  })

  const item = await Item.create({
    user_id: user.id,
    title: 'Test Item',
    url: 'https://myitem.example.com'
  })

  expect(item.userId === user.id)

  await item.destroy()

  expect((await Item.count())).toBe(0)
})

test('User delete cascade', async () => {
  await User.destroy({
    where: {
      email: 'admin@example.com'
    }
  })

  const items = await Item.findAll()
  expect(items.length).toBe(0)
})

test('Add new tag', async () => {
  const tag = await Tag.create({
    name: 'test tag'
  })

  expect((await Tag.findAll()).length).toBe(1)
})

test('Tag to user', async () => {
  const user = await User.create({
    username: 'taguser',
    email: 'taguser@example.com',
    password: 'password'
  })

  const tag = await Tag.findOne({
    where: {
      name: 'test tag'
    }
  })

  await user.addTags(tag)

  expect((await user.getTags()).length).toBe(1)
})

test('Delete association keeps tag', async () => {
  const tag = await Tag.findOne({
    where: {
      name: 'test tag'
    }
  })

  const user = await User.findOne({
    where: {
      username: 'taguser'
    }
  })

  user.removeTags(tag)

  expect((await Tag.findAll()).length).toBe(1)
})

test('Tag to item', async () => {
  const user = await User.findOne({
    where: {
      username: 'taguser'
    }
  })

  const item = await Item.create({
    user_id: user.id,
    title: 'lsio',
    url: 'https://linuxserver.io'
  })

  const tag = await Tag.findOne({
    where: {
      name: 'test tag'
    }
  })

  await item.addTags(tag)

  expect((await item.getTags()).length).toBe(1)
})
