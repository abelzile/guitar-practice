<template>
  <div>
    <vue-headful title="Guitar Practice - Metronome" />
    <h1>-~ Metronome ~-</h1>
    <ExerciseTimerComponent
      exercise-id="not-needed"
      v-bind:count-down-time-length-ms="countDownTime"
      v-bind:show-count-up-time="true"
      v-bind:show-count-down-time="false"
    />
  </div>
</template>
<script>
import ExerciseTimerComponent from "./ExerciseTimerComponent.vue";

export default {
  components: {
    ExerciseTimerComponent
  },
  computed: {
    countDownTime() {
      return Number.MAX_SAFE_INTEGER;
    }
  }
};
</script>
<style scoped>
</style>
