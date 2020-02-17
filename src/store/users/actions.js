import axios from 'axios'

export function getUsers (context) {
  axios
    .get(process.env.BACKEND_LOCATION + 'users', { crossdomain: true })
    .then((response) => {
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
