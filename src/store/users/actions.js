import axios from 'axios'

export function getUsers (context) {
  axios
    .get('http://heimdallbackend.test/users', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data)
    })
}
