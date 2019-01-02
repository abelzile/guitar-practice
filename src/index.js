import Vue from 'vue'
import App from '../components/App.vue'
import store from '../store';

Vue.directive('visible', (el, binding) => {
  if (!!binding.value) {
    el.style.visibility = 'visible';
  } else {
    el.style.visibility = 'hidden';
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  store: store
});