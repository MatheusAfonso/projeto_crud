import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, 
         faStore, 
         faAdd,
         faCashRegister, 
         faPrint, 
         faChevronLeft, 
         faUserPlus,
         faMagnifyingGlass,
         faTrash,
         faPen,
         faTimes,
         faCheck,
         faFloppyDisk,
         faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons'
import money from 'v-money'

const app = createApp(App);
app.use(router);
app.use(SnackbarService);
app.use(VueTheMask);
library.add(faUser, 
            faUserPlus, 
            faStore,
            faAdd,
            faCashRegister, 
            faPrint, 
            faChevronLeft,
            faMagnifyingGlass,
            faTrash,
            faPen,
            faTimes,
            faCheck,
            faFloppyDisk,
            faMoneyCheckDollar);
app.use(money, {precision: 4});
app.component("vue3-snackbar", Vue3Snackbar);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
