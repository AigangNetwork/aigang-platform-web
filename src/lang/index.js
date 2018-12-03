import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'
import moment from 'moment'

Vue.use(VueI18n)

let locale = 'en' // default locale

moment.locale(locale)

const messages = {
  en: en,
  ru: ru
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
