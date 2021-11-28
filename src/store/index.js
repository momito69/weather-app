import { createStore } from 'vuex'
import WeathersModule from './weathers'
import LocationsModule from './locations'

export const store = createStore({
    modules: {
        weather: WeathersModule,
        locations: LocationsModule
    },
    state: {
        location: {
            city: 'Lyon',
            id: 609125
        },
    },
    mutations: {
        setLocation(state, value){
            state.location = value
        }
    }
})