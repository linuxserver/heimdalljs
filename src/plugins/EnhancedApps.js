import axios from 'axios'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n.js'
export default class EnhancedApps {
  constructor(application) {
    this.data = application.config
    this.id = application.id
  }

  async call() {
    const request = await axios.get(process.env.BACKEND_LOCATION + 'enhanced/' + this.id)
    return request
  }

  async test() {
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

  static types() {
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

  filter(value, filter) {
    switch (filter) {
      case 'count':
        return value.length
    }
    return value
  }

  static filters() {
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
      },
      {
        id: 'count',
        value: 'count'
      }
    ]
  }

  fields() {
    if (this.data.type === 1) {
      return [{}]
    }
  }
}
