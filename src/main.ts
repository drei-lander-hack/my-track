import "@db-ui/core/dist/css/db-ui-core.vars.css"
import './assets/main.css'
// @ts-ignore
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(SimpleTypeahead);
app.mount('#app')
