import { createApp } from "vue";
import Popup from "./components/Popup.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(Popup);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
