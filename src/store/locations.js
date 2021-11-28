export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        locations: []
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        error(state) {
            return state.error;
        },
        hasLocations(state) {
            return state.locations.length > 0;
        },
        locations: state => {
            return state.locations
        }
    },
    mutations: {
        ['FETCHING_LOCATIONS'](state) {
            state.isLoading = true;
            state.error = null;
            state.locations = null;
        },
        ['FETCHING_LOCATIONS_SUCCESS'](state, locations) {
            state.isLoading = false;
            state.error = null;
            state.locations = locations.map( location => {
                return {
                    id: location.woeid,
                    city: location.title
                }
            }).filter((location, index) => index < 10)
        },
        ['FETCHING_LOCATIONS_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.locations = null;
        },
    },
    actions: {
        async fetchLocations({commit}, location) {
            commit('FETCHING_LOCATIONS');
            const url = `${process.env.VUE_APP_API_URL}search/?query=${location}`
            await fetch(url)
                .then((resp) => {
                    return resp.json();
                })
                .then((locations) => {
                    commit('FETCHING_LOCATIONS_SUCCESS', locations)
                })
                .catch(function (error) {
                    commit('FETCHING_LOCATIONS_ERROR', error)
                });
        }
    },
}