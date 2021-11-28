<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t('message.title') }}</h1>
        <h5>{{$t('message.description')}}</h5>
      </div>
    </div>
    <div class="row mt-5">
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
