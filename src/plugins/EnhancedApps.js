import axios from 'axios'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n.js'
export default class EnhancedApps {
  constructor (data) {
    this.data = data
  }

  async call () {
    if (this.data.stat1.url === this.data.stat2.url) { // both urls are the same, so use a single call to get data
      switch (this.data.enhancedType) {
        case 'apikey':
          return this.apikey()
      }
    } else { // separate urls so 2 calls needed

    }
  }

  async test () {
    try {
      const test = await this.call()
      Notify.create({
        type: 'positive',
        message: i18n.t('api_test_success') + ': ' + JSON.stringify(test.data),
        progress: true,
        position: 'bottom',
        timeout: 1500
      })
    } catch (e) {
      Notify.create({
        type: 'negative',
        message: i18n.t('api_test_failure') + ': ' + e.response.data,
        progress: true,
        position: 'bottom',
        timeout: 1500
      })
    }
  }

  async apikey () {
    let url = this.data.stat1.url
    url = url.replace(':url:', this.data.url)
    url = url.replace(':apikey:', this.data.apikey)
    console.log(url)
    const request = await axios.get(process.env.BACKEND_LOCATION + 'cors/' + url)
    return request
  }

  static types () {
    return [
      {
        id: 'disabled',
        value: 'disabled'
      },
      {
        id: 'none',
        value: 'none'
      },
      {
        id: 'apikey',
        value: 'apikey'
      },
      {
        id: 'cookie',
        value: 'cookie'
      }
    ]
  }

  static filters () {
    return [
      {
        id: 'none',
        value: 'none'
      },
      {
        id: 'size',
        value: 'size'
      },
      {
        id: 'speed',
        value: 'speed'
      }
    ]
  }

  fields () {
    if (this.data.type === 1) {
      return [
        {

        }
      ]
    }
  }
}
