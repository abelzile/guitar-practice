<template>
  <div id="app" class="app">
    <h1>-~ Chord Changes ~-</h1>
    <div v-for="exercise in exercises">
      <h2>-~ Stage {{exercise.level}} ~-</h2>
      <ChordChangeExerciseComponent
          v-for="(item, index) in shuffle(exercise.exercises)"
          v-bind:key="item.id"
          v-bind:exercise="item"/>
    </div>
  </div>
</template>
<script>
  import ChordChangeExerciseComponent from './ChordChangeExerciseComponent.vue'
  import { mapGetters } from 'vuex'
  import ArrayUtils from '../src/array-utils.js';

  export default {
    components: {
      ChordChangeExerciseComponent
    },
    methods: {
      shuffle(array) {
        return ArrayUtils.shuffle(array);
      }
    },
    computed: mapGetters({
      exercises: 'getAllChordChangeExercises'
    })
  };
</script>
<style>
  body {
    background-color: #edd9a7;
    background-image: url('../media/images/noise.png');
    font-family: 'Charm', cursive;
  }
  .app {
    text-align: center;
  }
  .exercise-list__divider {
    width:608px;
    margin-top:20px;
    margin-bottom: 20px;
  }
</style>
