const axios = require('axios')

class EnhancedApps {
  constructor(data) {
    this.data = data
  }

  async call() {
    let stat1 = null
    let stat2 = null
    switch (this.data.enhancedType) {
      case 'apikey':
        stat1 = await this.apikey(this.data.stat1.url)
        if (this.data.stat1.url !== this.data.stat2.url && this.data.stat2.url) {
          stat2 = await this.apikey(this.data.stat2.url)
        } else {
          stat2 = stat1
        }
        break
      case 'basic_auth':
        stat1 = await this.basicauth(this.data.stat1.url)
        if (this.data.stat1.url !== this.data.stat2.url && this.data.stat2.url) {
          stat2 = await this.basicauth(this.data.stat2.url)
        } else {
          stat2 = stat1
        }
        break
      case 'none':
        break
      case 'cookie':
        break
      default:
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

  async basicauth(url) {
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
}

module.exports = EnhancedApps
