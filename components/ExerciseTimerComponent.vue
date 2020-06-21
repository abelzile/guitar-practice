<template>
  <div>
    <span v-visible="isStartVisible || isStopVisible" class="timer__decoration">
      <span class="timer__display" v-show="isCountDownVisible">{{ countDownTime }}</span>
      <span class="timer__display" v-show="isCountUpVisible">{{ countUpTime }}</span>
      <input
        type="number"
        class="timer__bpm"
        :min="minBpm"
        :max="maxBpm"
        placeholder="BPM"
        v-model="bpm"
        :disabled="!isStartVisible"
      />
      <button 
        type="button" 
        class="timer__button" 
        v-show="isStartVisible" 
        v-on:click="start"
      >Start</button>
      <button
        type="button"
        class="timer__button"
        v-show="isStopVisible"
        v-on:click="stop(false)"
      >Stop</button>
    </span>
  </div>
</template>

<script>
import Tock from "tocktimer";
import TimeUtils from "../src/time-utils";
import { MinBpm, MaxBpm } from "../src/consts.js";
import { Howl } from "howler";
import DingSound from "../media/sounds/ding.opus";
import Metro1Sound from "../media/sounds/conga.opus";
import Metro2Sound from "../media/sounds/clave.opus";

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
  _beatNum: 1,
  mounted() {
    this.$options._timer = new Tock({
      countdown: true,
      interval: 10,
      callback: this.update,
      complete: this.complete
    });
    this.$options._ding = new Howl({
      src: [DingSound]
    });
    this.$options._metro1 = new Howl({
      src: [Metro1Sound]
    });
    this.$options._metro2 = new Howl({
      src: [Metro2Sound]
    });
  },
  props: {
    countDownTimeLengthMs: {
      type: Number,
      required: true
    },
    exerciseId: {
      type: String,
      required: true
    },
    showCountDownTime: {
      type: Boolean,
      default: true
    },
    showCountUpTime: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    start() {
      const bpm = this.$store.state.exerciseTimer.bpm;
      const isBpmValid = this.isBpmValid(bpm);

      this.$options._isMetronomeOn = isBpmValid;
      this.$options._beatNum = 1;

      if (isBpmValid) {
        this.$options._beatIntervalMs = (60 / bpm) * 1000;
      }

      this.$store.dispatch("startTimer", {
        id: this.exerciseId,
        timeMs: this.countDownTimeLengthMs
      });
      this.$options._timer.start(this.countDownTimeLengthMs);
    },
    stop(addHistory = false) {
      this.$store.dispatch("stopTimer", { addHistory });
      this.$options._timer.stop();
      this.$options._displayLast = null;
      this.$options._beatLast = null;
    },
    update(timer) {
      timer = timer || this.$options._timer;

      const lap = timer.lap();

      if (
        !this.$options._displayLast ||
        this.$options._displayLast - lap >= this.$options._displayIntervalMs
      ) {
        this.$options._displayLast = lap;
        this.$store.dispatch("updateTimer", lap);
      }

      if (
        this.$options._isMetronomeOn &&
        (!this.$options._beatLast ||
          this.$options._beatLast - lap >= this.$options._beatIntervalMs)
      ) {
        this.$options._beatLast = lap;

        if (this.$options._beatNum === 4) {
          this.$options._metro2.play();
        } else {
          this.$options._metro1.play();
        }

        this.$options._beatNum++;

        if (this.$options._beatNum > 4) {
          this.$options._beatNum = 1;
        }
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
        this.$store.dispatch("updateBpm", parseInt(value, 10));
      }
    },
    countDownTime() {
      let timeMs = this.$store.getters.getExerciseTimeMs;
      if (timeMs < 0) {
        timeMs = 0;
      }
      return TimeUtils.msToTime(timeMs);
    },
    countUpTime() {
      const timeMs = this.$store.getters.getExerciseTimeMs;
      const countUpTimeMs = this.countDownTimeLengthMs - timeMs;
      return TimeUtils.msToTime(countUpTimeMs);
    },
    isStartVisible() {
      return this.$store.getters.getExerciseId === "";
    },
    isCountDownVisible() {
      return (
        this.showCountDownTime &&
        this.$store.getters.getExerciseId === this.exerciseId
      );
    },
    isStopVisible() {
      return this.$store.getters.getExerciseId === this.exerciseId;
    },
    isCountUpVisible() {
      return (
        this.showCountUpTime &&
        this.$store.getters.getExerciseId === this.exerciseId
      );
    },
    minBpm() {
      return MinBpm;
    },
    maxBpm() {
      return MaxBpm;
    }
  }
};
</script>

<style scoped>
.timer__decoration {
  display: inline-block;
  padding: 2px;
  border-bottom: 2px solid black;
}

.timer__display {
  font-family: "Cutive Mono", monospace;
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