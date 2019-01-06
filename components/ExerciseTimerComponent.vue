<template>
  <div>
    <span v-visible="isStartVisible || isStopVisible" class="timer__decoration">
      <span class="timer__display" v-visible="isTimeVisible">{{ time }}</span>
      <button type="button"
              class="timer__button"
              v-show="isStartVisible"
              v-on:click="start">Start
      </button>
      <button type="button"
              class="timer__button"
              v-show="isStopVisible"
              v-on:click="stop(false)">Stop
      </button>
      <input type="number"
             class="timer__bpm"
             :min="minBpm"
             :max="maxBpm"
             placeholder="BPM"
             v-model="bpm"
             :disabled="!isStartVisible"/>
    </span>
  </div>
</template>

<script>
  import Tock from 'tocktimer';
  import TimeUtils from '../src/time-utils';
  import {TimerLengthMs, MinBpm, MaxBpm} from '../src/consts.js';
  import {Howl} from 'howler';

  export default {
    _timer: null,
    _displayIntervalMs: 100,
    _displayLast: null,
    _ding: null,
    _metro1: null,
    _metro2: null,
    _isMetronomeOn: false,
    _beatIntervalMs: null,
    _beatLast: null,
    mounted() {
      this.$options._timer = new Tock({
        countdown: true,
        interval: 10,
        callback: this.update,
        complete: this.complete
      });
      this.$options._ding = new Howl({
        src: [require('../media/sounds/ding.opus')]
      });
      this.$options._metro1 = new Howl({
        src: [require('../media/sounds/conga.opus')]
      });
    },
    props: {
      exerciseId: String
    },
    methods: {
      start() {
        const bpm = this.$store.state.exerciseTimer.bpm;
        const isBpmValid = this.isBpmValid(bpm);

        this.$options._isMetronomeOn = isBpmValid;

        if (isBpmValid) {
          this.$options._beatIntervalMs = 60 / bpm * 1000;
        }

        this.$store.dispatch('startTimer', {id: this.exerciseId, timeMs: TimerLengthMs});
        this.$options._timer.start(TimerLengthMs);
      },
      stop(addHistory = false) {
        this.$store.dispatch('stopTimer', {addHistory});
        this.$options._timer.stop();
        this.$options._displayLast = null;
        this.$options._beatLast = null;
      },
      update(timer) {
        timer = timer || this.$options._timer;

        const lap = timer.lap();

        if (!this.$options._displayLast || this.$options._displayLast - lap >= this.$options._displayIntervalMs) {
          this.$options._displayLast = lap;
          this.$store.dispatch('updateTimer', lap);
        }

        if (this.$options._isMetronomeOn && (!this.$options._beatLast || this.$options._beatLast - lap >= this.$options._beatIntervalMs)) {
          this.$options._beatLast = lap;
          this.$options._metro1.play();
        }
      },
      complete(timer) {
        this.stop(true);
        this.$options._ding.play();
        this.$options._displayLast = null;
        this.$options._beatLast = null;
      },
      isBpmValid(bpm) {
        return Number.isInteger(bpm) && MinBpm <= bpm && bpm <= MaxBpm;
      }
    },
    computed: {
      bpm: {
        get() {
          return parseInt(this.$store.state.exerciseTimer.bpm, 10);
        },
        set(value) {
          this.$store.dispatch('updateBpm', parseInt(value, 10));
        }
      },
      time() {
        let timeMs = this.$store.getters.getExerciseTimeMs;
        if (timeMs < 0) {
          timeMs = 0;
        }
        return TimeUtils.msToTime(timeMs);
      },
      isStartVisible() {
        return this.$store.getters.getExerciseId === '';
      },
      isTimeVisible() {
        return this.$store.getters.getExerciseId === this.exerciseId;
      },
      isStopVisible() {
        return this.$store.getters.getExerciseId === this.exerciseId;
      },
      minBpm() {
        return MinBpm;
      },
      maxBpm() {
        return MaxBpm;
      }
    }
  }
</script>

<style scoped>
  .timer__decoration {
    display: inline-block;
    padding: 2px;
    border-bottom: 2px solid black;
  }

  .timer__display {
    font-family: 'Cutive Mono', monospace;
    font-size: 24px;
    vertical-align: middle;
  }

  .timer__button {
    vertical-align: middle;
  }

  .timer__bpm {
    width: 4em;
  }
</style>