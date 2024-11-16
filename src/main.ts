import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import AntDesignVue from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import AntDesignCore from './components'

const app = createApp(App)
app.use(AntDesignCore)
app.use(AntDesignVue)

app.use(router)

app.mount('#app')
