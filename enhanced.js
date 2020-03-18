const axios = require('axios')

class EnhancedApps {
  constructor (data) {
    this.data = data
  }

  async call () {
    if (this.data.stat1.url === this.data.stat2.url) { // both urls are the same, so use a single call to get data
      switch (this.data.enhancedType) {
        case 'apikey':
          return this.apikey(this.data.stat1.url)
      }
    } else { // separate urls so 2 calls needed

    }
  }

  async apikey (url) {
    url = url.replace(':url:', this.data.url)
    url = url.replace(':apikey:', this.data.apikey)
    const response = await axios.get(url)
    return response
  }
}

module.exports = EnhancedApps
