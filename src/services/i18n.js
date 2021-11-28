import {createI18n} from 'vue-i18n'
const messages = {
    en: {
        message: {
            placeholder: 'Please enter a city',
            title: "Forecast Weather App",
            description: "Application to see the forecast weather"
        }
    }
}

export default createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
})
