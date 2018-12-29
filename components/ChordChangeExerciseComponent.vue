<template>
  <div>
    <template v-for="(item, index) in exercise.chords">
      <ChordTabComponent
          v-bind:chord-name="item"
          v-bind:class="{ 'exercise__chord-tab--margin-left': index % 2 !== 0, 'exercise__chord-tab--margin': true }"/>
    </template>
    <ExerciseTimerComponent v-bind:exercise-id="exercise.id"/>
    <div class="exercise__history-msg">
      {{ getHistoryMsg(this.exercise.id) }}
    </div>
  </div>
</template>
<script>
  import ChordTabComponent from './ChordTabComponent.vue';
  import ExerciseTimerComponent from './ExerciseTimerComponent.vue';
  import ArrayUtils from '../src/array-utils.js'
  import {MotivationalStrings} from '../src/consts.js';

  export default {
    props: {
      exercise: Object
    },
    components: {
      ExerciseTimerComponent,
      ChordTabComponent
    },
    methods: {
      getHistoryMsg(exerciseId) {
        const entry = this.$store.getters.getExerciseHistoryEntry(exerciseId);

        if (!entry) {
          return null;
        } else {
          return 'Completed on: ' + entry.date.toLocaleString() + '. ' + ArrayUtils.random(MotivationalStrings);
        }
      }
    }
  }
</script>
<style scoped>
  .exercise__chord-tab--margin-left {
    margin-left: 10px;
  }

  .exercise__chord-tab--margin {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .exercise__history-msg {
    font-size: 24px;
  }

</style>