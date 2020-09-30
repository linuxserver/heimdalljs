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
    }
    return {
      stat1: stat1.data,
      stat2: stat2.data
    }
  }

  async apikey(url) {
    url = url.replace(':url:', this.data.url)
    url = url.replace(':apikey:', this.data.apikey)
    try {
      const response = await axios.get(url)
      console.log(response)
      return response
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = EnhancedApps
