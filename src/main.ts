import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AntDesignCore from './components'

const app = createApp(App)
app.use(AntDesignCore)

app.use(router)

app.mount('#app')
