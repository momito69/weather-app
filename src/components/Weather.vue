<template>
  <div class="weather row">
    <div class="col-12" v-if="isLoading">
      <LoaderComponent/>
    </div>
    <div class="col-12" v-else-if="hasError">
      {{ $t('message.weather.error') }}
    </div>
    <div
        v-else
        v-for="(weather, index) in weathers"
        :key="index"
        class="col">
      <h5 class="card-text">{{ moment(weather.applicable_date).format("ddd MMM DD") }}</h5>
      <img :src="getImage(weather.weather_state_abbr)" class="img-fluid" alt=""/>
      <div class="card-body">
        <h5 class="card-title">{{ weather.weather_state_name }}</h5>
        <p class="card-text alert alert-primary">Min Temp: {{ Math.round(weather.min_temp) }}°C</p>
        <p class="card-text alert alert-danger">Max Temp: {{ Math.round(weather.max_temp) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import LoaderComponent from "./Loader"
import moment from 'moment';

export default {
  name: 'WeatherComponent',
  components: {
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      isLoading: "weathers/isLoading",
      hasError: "weathers/hasError",
      weathers: "weathers/weathers",
    }),
    ...mapState({
      location: 'location'
    })
  },
  created() {
    this.moment = moment
    this.getWeathers(this.location)
  },
  methods: {
    ...mapActions({
      getWeathers: 'weathers/fetchWeathers'
    }),
    getImage(abbreviation) {
      return `${process.env.VUE_APP_API_IMAGE_URL}${abbreviation}.svg`
    }
  }
}
</script>
<style scoped>
</style>
