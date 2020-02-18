import axios from 'axios'
import { Notify, Cookies, LocalStorage } from 'quasar'

export function ping (context) {
  // console.log(Cookies.getAll())
  // console.log(process.env.BACKEND_LOCATION + 'ping')
  // Check to see if we are in setup
  let setup = LocalStorage.getItem('heimdall_setup')
  if (setup !== null) {
    context.commit('ping', 'setup')
    context.commit('step', setup)
    return false
  }

  axios
    .get(process.env.BACKEND_LOCATION + 'ping', {
      crossdomain: true
    }).then((response) => {
      // console.log(response.data)
      context.commit('ping', response.data.status)

      if (response.data.status === 'setup') {
        context.commit('step', 1)
      }

      if (response.data.status === 'ok') {
        context.commit('setUser', response.data.result)
        context.dispatch('tiles/getApps', null, { root: true })
      }
    }).catch(function () {
      Notify.create({
        type: 'negative',
        message: `Could not connect to backend server. ` + process.env.BACKEND_LOCATION + 'ping',
        progress: true,
        position: 'top',
        timeout: 1500
      })
    })
}

export async function setupUser (context, data) {
  // console.log(data)
  try {
    await axios.post(process.env.BACKEND_LOCATION + 'users', data)
    context.commit('step', 2)
  } catch (e) {
  // axios returned a non-200 response
  }
}

export async function setDefaults (context, data) {
  // const [ language, show_usernames ] = await Promise.all([
  await Promise.all([
    axios.put(process.env.BACKEND_LOCATION + 'settings', data.language),
    axios.put(process.env.BACKEND_LOCATION + 'settings', data.show_usernames)
  ])
  context.commit('step', 3)
}

export function setUser (context, user) {
  // console.log(data)
  context.commit('setUser', user)
}

export function login (context, data) {
  // console.log(data)
  axios
    .post(process.env.BACKEND_LOCATION + 'login', data)
    .then((response) => {
      console.log(response.data)
      /* Cookies.remove('jwt', {
        expires: 3600
      }) */
      Cookies.set('jwt', response.data.result.token, {
        expires: 3600
        // httpOnly: true
      })
      // context.commit('step', 2)
      ping(context)
    }).catch(function () {
      Notify.create({
        type: 'negative',
        message: `Could not log in.`,
        progress: true,
        position: 'top',
        timeout: 1500
      })
    })
}

export function logout (context) {
  // console.log(data)
  Cookies.remove('jwt', {
    expires: 3600
  })
  context.commit('logout')
}

export function getUsers (context) {
  axios
    .get(process.env.BACKEND_LOCATION + 'users', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('users', response.data.result)
    })
}
