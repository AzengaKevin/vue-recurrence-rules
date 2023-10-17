import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from '@/router'
import App from '@/App.vue'
import '@/fontaweosome'
import '@/bootstrap'

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
