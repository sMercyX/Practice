import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import withUUID from "vue-uuid";
import router from "./routes";

const app = createApp(App);

app.use(router);
app.use(withUUID)
app.mount("#app");