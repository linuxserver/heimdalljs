import axios from 'axios'

export function getUsers (context) {
  axios
    .get(process.env.BACKEND_LOCATION + '/users', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data)
    })
}
