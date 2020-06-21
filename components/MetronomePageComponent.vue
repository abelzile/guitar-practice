<template>
  <div>
    <vue-headful title="Guitar Practice - Predefined Chord Changes" />
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
import uuidV4 from "uuid/v4";
import ArrayUtils from "../src/array-utils.js";
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
