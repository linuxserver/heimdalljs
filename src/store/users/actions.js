import axios from 'axios'

export function getUsers (context) {
  console.log('get users')
  axios
    .get(process.env.BACKEND_LOCATION + 'users', { crossdomain: true })
    .then((response) => {
      console.log('got users')
      // console.log(response.data)
      context.commit('all', response.data.result)
    })
}

export function saveUser (context, data) {
  // console.log(data)

  axios
    .post(process.env.BACKEND_LOCATION + 'users', data)
    .then((response) => {
      // console.log(response.data)
      // context.commit('all', response.data)
    })
}

export function save (context, data) {
  if (data.id === null) {
    console.log(data)
    return axios
      .post(process.env.BACKEND_LOCATION + 'users', data.user, {
        /* headers: {
          'Content-Type': 'multipart/form-data'
        } */
      })
  } else {
    return axios
      .put(process.env.BACKEND_LOCATION + 'users', data.user, {
        /* headers: {
          'Content-Type': 'multipart/form-data'
        } */
      })
  }
}

export function clear (context) {
  context.commit('edit', {
    id: null,
    icon: null,
    email: null,
    username: null,
    password: '',
    totp: null
  })
}
