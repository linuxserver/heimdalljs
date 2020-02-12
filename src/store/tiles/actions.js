import axios from 'axios'

export function getApps (context) {
  axios
    .get(process.env.BACKEND_LOCATION, { crossdomain: true })
    .then((response) => {
      // console.log(response.data)
      context.commit('all', response.data.all_apps)
      context.commit('active', response.data.apps)
    })
}
