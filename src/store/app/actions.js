import axios from 'axios'
import { Notify, Cookies } from 'quasar'

export function ping (context) {
  console.log(Cookies.getAll())
  axios
    .get(process.env.BACKEND_LOCATION + 'ping', {
      crossdomain: true,
      withCredentials: true
    }).then((response) => {
      console.log(response.data)
      context.commit('ping', response.data.status)
      if (response.data.status === 'ok') {
        context.commit('setUser', response.data.data)
      }
    })
}

export function setupUser (context, data) {
  // console.log(data)

  axios
    .post(process.env.BACKEND_LOCATION + 'users', data)
    .then((response) => {
      // console.log(response.data)
      // context.commit('step', 2)
      ping(context)
    })
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
      Cookies.set('jwt', response.data.token, {
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
  context.commit('logout')
}
