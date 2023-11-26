import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from 'keycloak-js';
import router from './router'

let keycloak = new Keycloak('/keycloak.json');

keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    /*checkLoginIframe: false,
    flow: 'standard',
    responseMode: 'query',
    responseType: 'code',*/
    scope: 'openid offline_access'
}).then((auth) => {
    if (!auth) {
        //window.location.reload();
        console.log("Not Authenticated");
    } else {
        console.log("Authenticated");
        localStorage.setItem('jwt', keycloak.token);
    }
}).catch(() => {
    console.log("Could not authenticate");
});

const app = createApp(App)
app.config.globalProperties.$keycloak = keycloak
app.use(router)
app.mount('#app')
