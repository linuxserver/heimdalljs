import axios from 'axios'

export function getTags (context) {
  axios
    .get(process.env.BACKEND_LOCATION + '/tags', { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data)
    })
}
