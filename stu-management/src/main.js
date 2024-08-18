import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { BTable, BPagination } from 'bootstrap-vue-next';

const app = createApp(App);

// Sử dụng các component từ bootstrap-vue-next
app.component('BTable', BTable);
app.component('BPagination', BPagination);

app.mount('#app');