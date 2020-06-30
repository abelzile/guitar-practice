<template>
  <div>
    <hr style="width:50%; margin-top:20px;" />
    <h3>-~ {{ getTitle() }} ~-</h3>
    <template v-for="(item, index) in exercise.chords">
      <ChordTabComponent
        :chord-name="item"
        :class="{ 'exercise__chord-tab--margin-left': index % 2 !== 0, 'exercise__chord-tab--margin': true }"
      />
    </template>
    <ExerciseTimerComponent
      :exercise-id="exercise.id"
      :count-down-time-length-ms="60000"
      :show-count-up-time="false"
      :show-count-down-time="true"
    />
    <div class="exercise__history-msg">{{ getHistoryMsg(this.exercise.id) }}</div>
  </div>
</template>
<script>
import ChordTabComponent from "./ChordTabComponent.vue";
import ExerciseTimerComponent from "./ExerciseTimerComponent.vue";
import ArrayUtils from "../src/array-utils.js";
import { MotivationalStrings, TimerLengthMs } from "../src/consts.js";

export default {
  props: {
    exercise: Object,
    exerciseNum: Number
  },
  components: {
    ExerciseTimerComponent,
    ChordTabComponent
  },
  methods: {
    getTitle() {
      return (
        "Exercise " +
        this.exerciseNum +
        ": " +
        this.exercise.chords.join(" to ")
      );
    },
    getHistoryMsg(exerciseId) {
      const entry = this.$store.getters.getExerciseHistoryEntry(exerciseId);

      if (!entry) {
        return null;
      } else {
        return (
          "Completed on: " + entry.date.toLocaleString() + ". " + entry.message
        );
      }
    }
  }
};
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