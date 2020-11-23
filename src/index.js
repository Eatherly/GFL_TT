import './js/'
import "./scss/main.scss";
import "./css/main.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import Vue from "vue"
import Index from "./components/Index.vue";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

new Vue({ render: h => h(Index) }).$mount('#app')