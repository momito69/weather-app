import {createI18n} from 'vue-i18n'
const messages = {
    fr: {
        message: {
            placeholder: 'Veuillez saisir une ville'
        }
    }
}

export default createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages
})
