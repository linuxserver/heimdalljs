import axios from 'axios'
import { LocalStorage } from 'quasar'

export function getApps (context) {
  axios
    .get(process.env.BACKEND_LOCATION, { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data.all_apps)
      context.commit('active', response.data.apps)
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
