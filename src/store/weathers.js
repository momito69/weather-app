export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        weathers: []
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
        weathers: state => {
            return state.weathers
        }
    },
    mutations: {
        ['FETCHING_WEATHERS'](state) {
            state.isLoading = true;
            state.error = null;
            state.weathers = null;
        },
        ['FETCHING_WEATHERS_SUCCESS'](state, weathers) {
            state.isLoading = false;
            state.error = null;
            state.weathers = weathers.consolidated_weather
        },
        ['FETCHING_WEATHERS_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.weathers = null;
        },
    },
    actions: {
        async fetchWeathers({commit}, location) {
            commit('FETCHING_WEATHERS');
            const url = `${process.env.VUE_APP_API_URL}${location.id}`
            fetch(url)
                .then((resp) => {
                    return resp.json();
                })
                .then((weathers) => {
                    commit('FETCHING_WEATHERS_SUCCESS', weathers)
                })
                .catch(function (error) {
                    commit('FETCHING_WEATHERS_ERROR', error)
                });
        }
    },
}