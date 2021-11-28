<template>
  <div>
    <Autocomplete
        v-model.lazy="location"
        :input-class="inputClasses"
        :results-container-class="resultsContainerClasses"
        :results-item-class="resultsItemCLasses"
        @input="getLocations"
        @onSelect="updateWeathers"
        :results="locations"
        :max="10"
        :placeholder="$t('message.placeholder')"
    ></Autocomplete>
  </div>
</template>
<script>
export default {
  name: 'Location',
  data() {
    return {
      location: null,
      locations: [],
      inputClasses: [
          'form-control'
      ],
      resultsContainerClasses: [
          'list-group'
      ],
      resultsItemCLasses: [
          'list-group-item'
      ]
    }
  },
  methods: {
     getLocations(location){
       if(location.length > 0){
         this.$store.dispatch('locations/fetchLocations', location).then(() => {
           this.locations = this.$store.getters['locations/locations']
         })
       }
    },
    updateWeathers(location)
    {
      this.location = location
      console.log(location)
    },
  }
}
</script>
<style lang="scss" scoped>
.list-group-item{
  &:hover{
    background: black;
  }
}
</style>