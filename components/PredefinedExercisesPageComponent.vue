<template>
  <div>
    <vue-headful title="Guitar Practice - Predefined Chord Changes" />
    <h1>-~ Predefined Chord Changes ~-</h1>
    <div v-for="exercise in exercises" 
         v-bind:key="exercise.level">
      <h2>-~ Stage {{exercise.level}} ~-</h2>
      <ChordChangeExerciseComponent
          v-for="(item, index) in shuffle(exercise.exercises)"
          v-bind:key="item.id"
          v-bind:exercise="item"
          v-bind:exercise-num="index + 1"/>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ArrayUtils from '../src/array-utils.js';
  import ChordChangeExerciseComponent from './ChordChangeExerciseComponent.vue'

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
<style scoped>
  .exercise-list__divider {
    width:608px;
    margin-top:20px;
    margin-bottom: 20px;
  }
</style>