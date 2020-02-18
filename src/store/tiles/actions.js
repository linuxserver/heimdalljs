import axios from 'axios'
import { LocalStorage } from 'quasar'

export function getApps (context) {
  console.log('get apps')
  axios
    .get(process.env.BACKEND_LOCATION + 'items', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data.result)
      context.commit('active', response.data.result.filter(a => a.active === true))
    })
}

export function getPossibleApps (context, force = false) {
  let key = 'heimdall.possibleapps'
  let possibleapps = LocalStorage.getItem(key)
  // console.log(possibleapps)
  if (possibleapps === null || force === true) {
    axios
      .get('https://apps.heimdall.site/list', { crossdomain: true })
      .then((response) => {
        // console.log(response.data)
        context.commit('possibleapps', response.data.apps)
        LocalStorage.set(key, response.data)
      })
  } else {
    context.commit('possibleapps', possibleapps.apps)
  }
}

export function save (context, data) {
  axios
    .post(process.env.BACKEND_LOCATION + 'items', data)
    .then((response) => {
      // console.log(response.data)
      // context.commit('all', response.data.all_apps)
      // context.commit('active', response.data.apps)
    })
}

export function active (context, data) {
  return axios
    .put(process.env.BACKEND_LOCATION + 'items/' + data.id, {
      active: data.active
    })
}
