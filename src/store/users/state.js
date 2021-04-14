export default function () {
  return {
    all: [],
    create: false,
    level: null,
    permissions: [
      {
        label: 'Admin',
        value: 0
      },
      {
        label: 'Normal User',
        value: 1
      },
      {
        label: 'Read Only',
        value: 2
      }
    ],
    edit: {
      id: null,
      avatar: null,
      email: null,
      username: null,
      password: '',
      totp: null,
      settingsLanguage: null,
      multifactorEnabled: false
    }
  }
}
