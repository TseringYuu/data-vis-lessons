<template>
  <player class="custom-video" :options="options" />
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

export default {
  components: {
    player: videoPlayer,
  },
  props: {
    // src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
    value: String,
  },
  computed: {
    options () {
      return {
        // videojs options
        autoplay: 'muted',
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: this.value,
        }],
        poster: '/static/images/author.jpg',
      };
    },
  },
}
// npm
// pnpm
// yarn
// 都试过了还不好使  要去github中的issue找相关的问题
</script>

<style scoped>
::v-deep.custom-video>div {
  width: 100%;
  height: 100%;
}
</style>