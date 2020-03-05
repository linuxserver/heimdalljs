import axios from 'axios'
import { LocalStorage } from 'quasar'

export function getApps (context) {
  console.log('get apps')
  axios
    .get(process.env.BACKEND_LOCATION + 'items', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data.result)
      context.commit('active', response.data.result.filter(a => a.UserItem.active === true))
    })
}

export function getPossibleApps (context, force = false) {
  const key = 'heimdall.allpossibleapps'
  const possibleapps = LocalStorage.getItem(key)
  // console.log(possibleapps)
  if (possibleapps === null || force === true) {
    axios
      .get(process.env.BACKEND_LOCATION + 'cors/https://apps.heimdall.site/applications.json', { crossdomain: true, withCredentials: true })
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
  if (data.id === null) {
    return axios
      .post(process.env.BACKEND_LOCATION + 'items', data.tile)
  } else {
    return axios
      .put(process.env.BACKEND_LOCATION + 'items/' + data.id, data.tile)
  }
}

export function active (context, data) {
  return axios
    .put(process.env.BACKEND_LOCATION + 'items/' + data.id, data.data)
}

export function clear (context) {
  context.commit('edit', {
    id: null,
    icon: null,
    title: null,
    tags: null,
    description: '',
    url: null,
    color: null,
    applicationtype: null,
    possibletags: null
  })
}

export function stopChecks (context) {
  console.log('stop checks')
  context.commit('running', false)
}

export function startChecks (context) {
  // const tiles = context.state.active.filter(t => t.config.enhancedType !== 'disabled')
  console.log('start checks')
  context.commit('running', true)
}
