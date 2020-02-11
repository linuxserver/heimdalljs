<template>
  <section class="item-container ui-sortable-handle" data-id="3">
    <div class="item" :style="'background-color: ' + this.$attrs.colour">
      <img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon">
      <div class="details">
        <div class="title white">{{ this.$attrs.title }}</div>
      </div>
      <a title="NZBGet is a binary downloader, which downloads files from Usenet based on information given in nzb-files. NZBGet is written in C++ and is known for its extraordinary performance and efficiency. - GNU General Public License v2.0 only" class="link white" href="http://test.com"><svg class="svg-inline--fa fa-arrow-alt-to-right fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-alt-to-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zM24 320h136v87.7c0 17.8 21.5 26.7 34.1 14.1l152.2-152.2c7.5-7.5 7.5-19.8 0-27.3L194.1 90.1c-12.6-12.6-34.1-3.7-34.1 14.1V192H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24z"></path></svg><!-- <i class="fas fa-arrow-alt-to-right"></i> --></a>
    </div>
    <a class="item-edit" href="http://heimdallmaster.test/items/3/edit"><svg class="svg-inline--fa fa-pencil fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg><!-- <i class="fas fa-pencil"></i> --></a>
  </section>
</template>

<script>

export default {
  name: 'Tile',

  props: ['application'],

  components: {
  },

  data () {
    return {
      icon: this.$attrs.icon || '../img/heimdall-icon-small.png'
    }
  }
}
</script>
