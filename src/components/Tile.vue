<template>
  <section class="item-container ui-sortable-handle" :class="{ preview: preview }" :data-id="this.$attrs.id">
    <div class="item" :style="'background-color: ' + bgColor + '; color: ' + textColor + ''">
      <img class="app-icon" :src="appIcon">
      <div class="details">
        <div class="title white">{{ application.title }}</div>
      </div>
      <a :style="'color: ' + textColor" :title="application.description" class="link white" :href="application.url"><svg class="svg-inline--fa fa-arrow-alt-to-right fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-alt-to-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zM24 320h136v87.7c0 17.8 21.5 26.7 34.1 14.1l152.2-152.2c7.5-7.5 7.5-19.8 0-27.3L194.1 90.1c-12.6-12.6-34.1-3.7-34.1 14.1V192H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24z"></path></svg><!-- <i class="fas fa-arrow-alt-to-right"></i> --></a>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Tile',

  props: ['application'],

  components: {
  },

  computed: {
    textColor () {
      const bgColor = this.bgColor
      const lightColor = '#ffffff'
      const darkColor = '#000000'
      const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor
      const alpha = (bgColor.charAt(0) === '#') ? bgColor.substring(7, 9) : bgColor.substring(6, 8)
      const r = parseInt(color.substring(0, 2), 16) // hexToR
      const g = parseInt(color.substring(2, 4), 16) // hexToG
      const b = parseInt(color.substring(4, 6), 16) // hexToB
      const a = parseFloat(parseInt((parseInt(alpha, 16) / 255) * 1000) / 1000)
      const brightness = r * 0.299 + g * 0.587 + b * 0.114 + (1 - a) * 255
      return brightness > 186 ? darkColor : lightColor
    },
    bgColor () {
      if (this.application.color !== 'null' && this.application.color !== null) {
        return this.application.color
      }
      return '#222222'
    },
    preview () {
      return this.application.preview
    },
    appIcon () {
      if (this.application.icon && this.application.icon.startsWith('http')) {
        return this.application.icon
      }
      return process.env.BACKEND_LOCATION + this.application.icon
    }
  },

  data () {
    return {
      icon: this.$attrs.icon || '../img/heimdall-icon-small.png'
    }
  }
}
</script>
