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
        <LocationComponent />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <WeatherComponent />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherComponent from "./components/Weather"
import LocationComponent from "./components/Location";
export default {
  name: 'App',
  components: {
    LocationComponent,
    WeatherComponent
  }
}
</script>
