<template>
  <div class="autocomplete form-group row">
    <div class="col-12">
      <input
          id="autocomplete"
          type="text"
          class="form-control"
          @change="setLocationToSearchFor"
          @input="onChange"
          v-model="location.city"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
          autocomplete="off"
          :placeholder="$t('message.placeholder')"
      />
      <ul
          id="autocomplete-results"
          v-show="isOpen"
          class="autocomplete-results"
      >
        <li
            v-for="(location, i) in locations"
            :key="i"
            @click="setLocation(location)"
            class="autocomplete-result"
            :class="{ 'is-active': i === arrowCounter }"
        >
          {{ location.city }}
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
export default {
  name: 'LocationComponent',
  data() {
    return {
      isOpen: false,
      locations: [],
      arrowCounter: 0,
    }
  },
  computed: {
    location: {
      get() {
        return this.$store.state.location
      },
      set(value) {
        this.$store.commit('setLocation', value)
      }
    }
  },
  methods: {
    setLocationToSearchFor(e) {
      this.location.city = e.target.value
    },
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this)
      // Let's  our flat array
      this.filterResults()
      this.isOpen = true
    },

    filterResults() {
      if (this.location.city.length > 0) {
        this.$store.dispatch('locations/fetchLocations', this.location.city).then(() => {
          this.locations = this.$store.getters['locations/locations'].filter((location) => {
            return location.city.toLowerCase().indexOf(this.location.city.toLowerCase()) > -1
          })
        })
      }
    },
    setLocation(location) {
      this.location = location
      this.isOpen = false
    },
    onArrowDown() {
      if (this.arrowCounter < this.locations.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.location = this.locations[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    }
  },
  watch: {
    locations: function (val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.locations = val
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
<style scoped lang="scss">
.autocomplete {
  position: relative;

  .autocomplete-results {
    margin: 0;
    height: auto;
    display: block;
    position: absolute;
    z-index: 1;
    left: 0;
    width: 100%;
    padding: 0 15px;
    top: 38px;

    .autocomplete-result {
      list-style: none;
      text-align: left;
      padding: 5px;
      cursor: pointer;
      background: white;
      border-left: 1px solid #eee;
      float: left;
      width: 100%;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;

      &.is-active, &:hover {
        background-color: #4AAE9B;
        color: white;
      }
    }
  }
}
</style>
