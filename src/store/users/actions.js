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

export async function save (context, data) {
  if (data.id === null) {
    const user = await axios
      .post(process.env.BACKEND_LOCATION + 'users', data.user)
    console.log(user)
    let media = null
    if (data.media) {
      media = await axios
        .put(process.env.BACKEND_LOCATION + 'users/' + user.data.id + '/avatar', data.media)
    }
    return {
      user: user,
      media: media
    }
  } else {
    const user = await axios
      .put(process.env.BACKEND_LOCATION + 'users/' + data.id, data.user)
    let media = null
    if (data.media) {
      media = await axios
        .put(process.env.BACKEND_LOCATION + 'users/' + data.id + '/avatar', data.media)
    }
    return {
      user: user,
      media: media
    }
  }
}

export function clear (context) {
  context.commit('edit', {
    id: null,
    avatar: null,
    email: null,
    username: null,
    password: '',
    totp: null
  })
}
