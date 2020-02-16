import Vue from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
