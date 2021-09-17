const axios = require('axios')
const https = require('https')

class EnhancedApps {
  constructor(data) {
    this.data = data
    this.agent = new https.Agent({ rejectUnauthorized: false })
    this.config = {
      httpsAgent: this.agent
    }
    if ('additional_headers' in this.data && this.data.additional_headers !== '') {
      this.config.headers = JSON.parse(this.data.additional_headers)
    }
  }

  async call() {
    let stat1 = null
    let stat2 = null
    const url1 = await this.urlFilter(this.data.stat1.url)
    const url2 = await this.urlFilter(this.data.stat2.url)

    let method_name = this.data.enhancedType

    switch (method_name) {
      case 'basic_auth':
        await this.basic_auth()
        break
      case 'cookie':
        await this.cookie()
        break
    }

    try {
      stat1 = await this.externalCall(url1)
      if (url1 === url2) stat2 = stat1
      else stat2 = await this.externalCall(url2)
    } catch (e) {
      throw e
    }

    return {
      stat1: stat1.data.result || stat1.data,
      stat2: stat1.data.result || stat2.data
    }
  }

  async externalCall(url) {
    try {
      const response = await axios.get(url, this.config)
      return response
    } catch (e) {
      throw e
    }
  }

  async urlFilter(url) {
    url = url.replace(':url:', this.data.url)
    url = url.replace(':apikey:', this.data.apikey)
    url = url.replace(':username:', this.data.basic_auth_user)
    url = url.replace(':password:', this.data.basic_auth_password)

    return url
  }

  async basic_auth(url) {
    this.config.auth = {
      username: this.data.basic_auth_user,
      password: this.data.basic_auth_password
    }
  }

  async cookie(url) {
    // this one still needs doing
  }
}

module.exports = EnhancedApps
