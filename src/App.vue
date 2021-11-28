<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12">
        <Location />
      </div>
    </div>
  </div>
</template>

<script>
import Location from './components/Location.vue'

export default {
  name: 'App',
  components: {
    Location
  },
  created() {
    this.$store.dispatch('weather/fetchWeather', this.$store.state.location);
  },
  computed: {

  }
}
</script>
