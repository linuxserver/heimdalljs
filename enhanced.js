const axios = require('axios')

class EnhancedApps {
  constructor(data) {
    this.data = data
  }

  async call() {
    let stat1 = null
    let stat2 = null
    let reuse = true
    if (this.data.stat1.url !== this.data.stat2.url && this.data.stat2.url) {
      reuse = false
    }
    let method_name = this.data.enhancedType

    if (typeof this[`${method_name}`] === 'function') {
      stat1 = await this[`${method_name}`](this.data.stat1.url)
      if (reuse) stat2 = stat1
      else stat2 = await this[`${method_name}`](this.data.stat2.url)
    } else {
      console.error(`unrecognized enhanced type for ${JSON.stringify(this)}`)
    }

    return {
      stat1: stat1.data.result || stat1.data,
      stat2: stat1.data.result || stat2.data
    }
  }

  async apikey(url) {
    url = url.replace(':url:', this.data.url)
    url = url.replace(':apikey:', this.data.apikey)
    try {
      const response = await axios.get(url)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async basic_auth(url) {
    url = url.replace(':url:', this.data.url)
    try {
      const response = await axios.get(url, {
        auth: {
          username: this.data.basic_auth_user,
          password: this.data.basic_auth_password
        }
      })
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async none(url) {
    url = url.replace(':url:', this.data.url)
    try {
      const response = await axios.get(url)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async cookie(url) {
    // this one still needs doing
    url = url.replace(':url:', this.data.url)
    try {
      const response = await axios.get(url)
      return response
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = EnhancedApps
