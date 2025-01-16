// plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Solid icons
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// Brand icons
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faGithub,
    faDribbble,
} from '@fortawesome/free-brands-svg-icons';

// Add icons to the library
library.add(faBars, faTimes, faFacebook, faInstagram, faTwitter, faGithub, faDribbble);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
