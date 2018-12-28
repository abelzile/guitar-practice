import Vue from 'vue'
import App from '../components/App.vue'
import store from '../store';

new Vue({
  el: '#app',
  render: h => h(App),
  store: store
});


