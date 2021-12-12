

import { createApp } from 'vue';
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './components/TodoComponent.vue';


const app = Vue.createApp(App)
app.use(VueAxios, axios)
// const app = createApp(App)

app.mount('#app');




