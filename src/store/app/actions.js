import axios from 'axios'
import { Notify, Cookies, LocalStorage } from 'quasar'

export async function status(context) {
  // Check to see if we are in setup
  console.log('check status')
  const setup = LocalStorage.getItem('heimdall_setup')
  if (setup !== null) {
    context.commit('status', 'setup')
    context.commit('step', setup)
    return false
  }

  try {
    const response = await axios.get(process.env.BACKEND_LOCATION + 'status')
    context.commit('status', response.data.status)
    if (response.data.status === 'setup') {
      context.commit('step', 1)
    }
    // get settings
    const settings = await getSettings()
    const currentsettings = { ...context.state.settings }
    if (settings.active_search_providers.length > 0) {
      settings.search_provider = settings.active_search_providers[0]
    }
    const update = Object.assign(currentsettings, settings)
    context.commit('settings', update)

    // let mappedsettings = {}
    /* settings.data.result.map(e => )
    context.commit('background', settings.data.result.find(e => e.key === 'background_image'))
    context.commit('show_usernames', settings.data.result.find(e => e.key === 'show_usernames'))
    context.commit('language', settings.data.result.find(e => e.key === 'language'))
    console.log(mappedsettings) */
    // context.commit('show_usernames', response.data.result)

    // see if already logged in
    if (response.data.status === 'ok') {
      if (response.data.result !== null) {
        context.dispatch('tiles/getApps', null, { root: true })
        context.dispatch('users/getUsers', null, { root: true })
        context.commit('setLoginStatus', 'logged_in')
        context.commit('setUser', response.data.result)
      }
    }
  } catch (e) {
    Notify.create({
      type: 'negative',
      message:
        `Could not connect to backend server. ` +
        process.env.BACKEND_LOCATION +
        'ping',
      progress: true,
      position: 'top',
      timeout: 1500
    })
  }
}

export async function setupUser(context, data) {
  // console.log(data)
  try {
    data.level = 0
    const saveuser = await axios.post(
      process.env.BACKEND_LOCATION + 'users',
      data
    )
    console.log(saveuser)
    await firelogin(context, {
      username: data.username,
      password: data.password
    })
    context.commit('step', 3)
  } catch (e) {
    // axios returned a non-200 response
  }
}

export async function getSettings(context) {
  const settings = await axios.get(process.env.BACKEND_LOCATION + 'settings')
  const result = {}
  settings.data.result.forEach(setting => {
    result[setting.key] = setting.value
  })
  return result
}

export async function getSearchProviders(context) {
  const settings = await axios.get(
    process.env.BACKEND_LOCATION + 'searchproviders'
  )
  context.commit('searchProviders', settings.data.result)
}

export async function setDefaults(context, data) {
  // const [ language, show_usernames ] = await Promise.all([
  /* await Promise.all([
    axios.put(process.env.BACKEND_LOCATION + 'settings', data.language),
    axios.put(process.env.BACKEND_LOCATION + 'settings', data.show_usernames)
  ]) */
  axios.put(process.env.BACKEND_LOCATION + 'settings', data)
  context.commit('step', 2)
}

export async function saveSettings(context, data) {
  try {
    const settings = { ...context.state.settings }
    const update = Object.assign(settings, data)
    const response = await axios.put(
      process.env.BACKEND_LOCATION + 'settings',
      update
    )
    if (response.data.status === 'ok') {
      if (update.active_search_providers.length > 0) {
        update.search_provider = update.active_search_providers[0]
      }
      context.commit('settings', update)

      Notify.create({
        type: 'positive',
        message: `Setting updated`,
        progress: true,
        position: 'bottom',
        timeout: 1500
      })
    }
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: `Could not update setting`,
      progress: true,
      position: 'bottom',
      timeout: 1500
    })
  }
}

export function setupComplete(context) {
  LocalStorage.remove('heimdall_setup')
  console.log('finish')
  status(context)
  context.dispatch('users/getUsers', null, { root: true })
}

export async function auth(context) {
  try {
    const response = await axios.get(process.env.BACKEND_LOCATION + 'auth')
    if (response.data.status === 'ok') {
      context.commit('setUser', response.data.result)
      context.dispatch('tiles/getApps', null, { root: true })
    }
  } catch (e) {
    console.log(e)
  }
}

export function setUser(context, user) {
  // console.log(data)
  context.commit('setUser', user)
}

export async function firelogin(context, data) {
  const response = await axios.post(
    process.env.BACKEND_LOCATION + 'login',
    data
  )
  if (response.data.result && response.data.result.token) {
    Cookies.set('jwt', response.data.result.token, {
      expires: 3600
    })
  }

  return response
}

export async function unsplash(context) {
  const settings = await axios.get(
    process.env.BACKEND_LOCATION +
      'cors/https://api.unsplash.com/photos/random?orientation=landscape'
  )
  return 'background-image: url(' + settings.response.data.urls.full + ')'
}

export async function login(context, data) {
  // console.log(data)
  const response = await firelogin(context, data)
  console.log(response)
  switch (response.data.status) {
    case 'ok':
      auth(context)
      context.commit('setLoginStatus', 'logged_in')
      break
    case 'multifactor':
      context.commit('setLoginStatus', 'multifactor')
      break
  }
  // ping(context)
  return response
}

export function logout(context) {
  // console.log(data)
  Cookies.remove('jwt', {
    expires: 3600
  })
  context.commit('logout')
  this.$router.push('/')
}
