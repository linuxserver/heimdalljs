import axios from 'axios'

export function ping (context) {
  axios
    .get(process.env.BACKEND_LOCATION + 'ping', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('ping', response.data.status)
    })
}

export function setupUser (context, data) {
  // console.log(data)

  axios
    .post(process.env.BACKEND_LOCATION + 'users', data)
    .then((response) => {
      // console.log(response.data)
      context.commit('step', 2)
    })
}
