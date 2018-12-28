<template>
  <div>
    <template v-for="(item, index) in exercise.chords">
      <ChordTabComponent
          v-bind:chord-name="item"
          v-bind:class="{ 'exercise__chord-tab--margin-left': index % 2 !== 0, 'exercise__chord-tab--margin': true }"/>
    </template>
    <ExerciseTimerComponent v-bind:exercise-id="exercise.id"/>
  </div>
</template>
<script>
  import ChordTabComponent from './ChordTabComponent.vue';
  import ExerciseTimerComponent from './ExerciseTimerComponent.vue';

  export default {
    props: {
      exercise: Object
    },
    components: {
      ExerciseTimerComponent,
      ChordTabComponent
    },
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
</style>