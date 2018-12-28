<template>
  <div>
    <audio id="ding" src="../media/sound/ding.opus"></audio>
    <span class="timer__display" v-show="isStartTimerVisible">{{ showTime }}</span>
    <button type="button"
            class="timer__button"
            v-show="isStartButtonVisible"
            v-on:click="start">Start
    </button>
    <button type="button"
            class="timer__button"
            v-show="isStopButtonVisible"
            v-on:click="stop">Stop
    </button>
  </div>
</template>

<script>
  import Tock from 'tocktimer';
  import TimeUtils from '../src/time-utils';

  export default {
    timer: null,
    ding: null,
    mounted() {
      this.$options.timer = new Tock({
        countdown: true,
        interval: 100,
        callback: this.update,
        complete: this.complete
      });
      this.$options.ding = document.getElementById("ding");
    },
    props: {
      exerciseId: String
    },
    methods: {
      start() {
        const timeMs = 1000;
        this.$store.dispatch('startTimer', {id: this.exerciseId, timeMs: timeMs});
        this.$options.timer.start(timeMs);
      },
      stop() {
        this.$store.dispatch('stopTimer');
        this.$options.timer.stop();
      },
      update(timer) {
        timer = timer || this.$options.timer;
        this.$store.dispatch('updateTimer', timer.lap());
      },
      complete(timer) {
        this.stop();
        this.$options.ding.play();
      }
    },
    computed: {
      isStartButtonVisible() {
        return this.$store.getters.getExerciseId === '';
      },
      isStartTimerVisible() {
        return this.$store.getters.getExerciseId === this.exerciseId;
      },
      isStopButtonVisible() {
        return this.$store.getters.getExerciseId === this.exerciseId;
      },
      showTime() {
        let timeMs = this.$store.getters.getExerciseTimeMs;
        if (timeMs < 0) {
          timeMs = 0;
        }
        return TimeUtils.msToTime(timeMs);
      }
    }
  }
</script>

<style scoped>
  .timer__display {
    font-family: 'Cutive Mono', monospace;
    font-size: 24px;
    vertical-align: middle;
  }
  .timer__button {
    vertical-align: middle;
  }
</style>