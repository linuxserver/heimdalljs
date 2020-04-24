export default function () {
  return {
    all: [],
    create: false,
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
