import axios from 'axios'
import { LocalStorage } from 'quasar'

export function getApps(context) {
  console.log('get apps')
  axios.get(process.env.BACKEND_LOCATION + 'items', { crossdomain: true }).then(response => {
    // console.log(response.data)
    context.commit('all', response.data.result.items)
    context.commit(
      'active',
      response.data.result.items.filter(a => a.UserItem.active === true)
    )
    console.log(response.data.result.system)
    if (response.data.result.system) {
      context.commit('system', response.data.result.system)
    }
  })
}

export function getPossibleApps(context, force = false) {
  const key = 'heimdall.allpossibleapps'
  const possibleapps = LocalStorage.getItem(key)
  // console.log(possibleapps)
  if (possibleapps === null || force === true) {
    axios.get(process.env.BACKEND_LOCATION + 'cors/https://appslist.heimdall.site/list.json', { crossdomain: true, withCredentials: true }).then(response => {
      // console.log(response.data)
      context.commit('possibleapps', response.data.apps)
      LocalStorage.set(key, response.data)
    })
  } else {
    context.commit('possibleapps', possibleapps.apps)
  }
}

export function save(context, data) {
  // Removing as we're storing the protocol separately now
  /* if (data.tile.url !== undefined && !data.tile.url.includes('://')) {
    const prefix = 'https://'
    data.tile.url = prefix.concat(data.tile.url)
  } */
  if (data.id === null) {
    return axios.post(process.env.BACKEND_LOCATION + 'items', data.tile)
  } else {
    return axios.put(process.env.BACKEND_LOCATION + 'items/' + data.id, data.tile)
  }
}

export function saveIcon(context, data) {
  if (data.id !== null) {
    return axios.put(process.env.BACKEND_LOCATION + 'items/' + data.id + '/icon', data.media)
  }
}

export function saveUsers(context, data) {
  if (data.id !== null) {
    return axios.put(process.env.BACKEND_LOCATION + 'items/' + data.id + '/users', { users: data.users })
  }
}

export function active(context, data) {
  return axios.put(process.env.BACKEND_LOCATION + 'items/' + data.id, data.data)
}

export async function deleteApp(context, id) {
  await axios.delete(process.env.BACKEND_LOCATION + 'items/' + id)
  getApps(context)
}

export function clear(context) {
  context.commit('edit', {
    id: null,
    icon: null,
    title: null,
    users: null,
    tags: null,
    description: '',
    url: null,
    color: null,
    applicationtype: null,
    possibletags: null,
    link_tab: 'default'
  })
}

export function stopChecks(context) {
  console.log('stop checks')
  context.commit('running', false)
}

export function startChecks(context) {
  // const tiles = context.state.active.filter(t => t.config.enhancedType !== 'disabled')
  console.log('start checks')
  context.commit('running', true)
}
