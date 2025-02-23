import { createApp } from "vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faGlobe, faLinkedin, faGithub, faSearch);
import "@/assets/style.css";
import App from "./App.vue";
const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
