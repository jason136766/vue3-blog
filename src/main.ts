import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/display.css'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
