import Vue from 'vue'
import VueRouter from 'vue-router'
import TheApp from '../components/TheApp.vue'
import store from '../store';
import routes from '../routes';

Vue.use(VueRouter);

Vue.directive('visible', (el, binding) => {
  if (!!binding.value) {
    el.style.visibility = 'visible';
  } else {
    el.style.visibility = 'hidden';
  }
});

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  render: h => h(TheApp),
  store,
  router
});