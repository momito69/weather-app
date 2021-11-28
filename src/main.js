import { createApp } from 'vue'
import i18n from "./services/i18n";
import { store } from "./store";
import BootstrapVue3 from 'bootstrap-vue-3'
import Autocomplete from 'vue3-autocomplete'
import 'vue3-autocomplete/dist/vue3-autocomplete.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'


const app = createApp(App)
app.use(i18n)
app.use(store)
app.use(BootstrapVue3)
app.component('Autocomplete', Autocomplete)
app.mount('#app')
