import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from 'keycloak-js';
import router from './router';

function initializeKeycloak(config) {
    let keycloak = new Keycloak({
        url: config['auth-server-url'],
        realm: config.realm,
        clientId: config.resource
    });

    keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        scope: 'openid offline_access'
    }).then((auth) => {
        if (!auth) {
            console.log("Not Authenticated");
        } else {
            console.log("Authenticated");
            localStorage.setItem('jwt', keycloak.token);
        }

        const app = createApp(App);
        app.config.globalProperties.$keycloak = keycloak;
        app.use(router);
        app.mount('#app');
    }).catch(() => {
        console.log("Could not authenticate");
    });
}

if (process.env.NODE_ENV === 'development') {
    const config = require('../keycloak.json');
    initializeKeycloak(config);
} else {
    fetch('/config')
        .then(response => response.json())
        .then(config => {
            console.log("Auth server: " + config['auth-server-url']);
            initializeKeycloak(config);
        })
        .catch(error => {
            console.error("Failed to fetch configuration:", error);
        });
}
