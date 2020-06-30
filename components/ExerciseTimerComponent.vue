<template>
  <div>
    <div class="timer__decoration">
      <div>
        <span class="timer__display-main">
          <span class="timer__digits" v-show="isCountDownVisible">{{ countDownTime }}</span>
          <span class="timer__digits" v-show="isCountUpVisible">{{ countUpTime }}</span>
        </span>
        <input
          type="number"
          class="timer__bpm"
          :min="minBpm"
          :max="maxBpm"
          placeholder="BPM"
          v-model="bpm"
          :disabled="!isStartVisible"
        />
        <button type="button" class="timer__button" v-show="isStartVisible" v-on:click="start">Start</button>
        <button
          type="button"
          class="timer__button"
          v-show="isStopVisible"
          v-on:click="stop(false)"
        >Stop</button>
      </div>
      <div>
        <label class="timer__accent-label">
          <select v-model="selectedMetronomeId" :disabled="!isStartVisible">
            <option v-for="s in metronomeSounds" v-bind:value="s.id">{{ s.description }}</option>
          </select>
          <input
            type="checkbox"
            :disabled="!isStartVisible"
            v-model="accent"
            class="timer__accent-checkbox"
          />Accent
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Tock from "tocktimer";
import TimeUtils from "../src/time-utils";
import { MinBpm, MaxBpm } from "../src/consts.js";
import { Howl } from "howler";
import DingSound from "../media/sounds/ding.opus";
import MetroGrp01Snd01 from "../media/sounds/conga.opus";
import MetroGrp01Snd02 from "../media/sounds/clave.opus";
import MetroGrp02Snd01 from "../media/sounds/cowbell-lo.opus";
import MetroGrp02Snd02 from "../media/sounds/cowbell-hi.opus";

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
  data: function() {
    return {
      metronomeSounds: [
        {
          id: 1,
          description: "Conga & Clave",
          boop: new Howl({ src: [MetroGrp01Snd01] }),
          accent: new Howl({ src: [MetroGrp01Snd02] })
        },
        {
          id: 2,
          description: "Cowbell",
          boop: new Howl({ src: [MetroGrp02Snd01] }),
          accent: new Howl({ src: [MetroGrp02Snd02] })
        }
      ]
    };
  },
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

        const sounds =
          this.metronomeSounds.find(s => s.id === this.selectedMetronomeId) ||
          this.metronomeSounds[0];

        if (this.accent && this.$options._beatNum === 4) {
          sounds.accent.play();
        } else {
          sounds.boop.play();
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
    accent: {
      get() {
        return this.$store.state.exerciseTimer.accent;
      },
      set(value) {
        this.$store.dispatch("updateAccent", value);
      }
    },
    selectedMetronomeId: {
      get() {
        return this.$store.state.exerciseTimer.metronomeSoundId;
      },
      set(value) {
        this.$store.dispatch("updateMetronomeSoundId", value);
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
  padding: 2px;
}

.timer__digits {
  font-family: "Cutive Mono", monospace;
  font-size: 24px;
  vertical-align: middle;
}

.timer__display-main {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.6);
  width: 120px;
  height: 30px;
  vertical-align: middle;
  text-align: center;
}

.timer__button {
  vertical-align: middle;
}

.timer__bpm {
  width: 4em;
  vertical-align: middle;
}

.timer__accent-label {
  margin-left: 5px;
  padding: 0 5px;
  background: rgba(255, 255, 255, 0.6);
  vertical-align: middle;
}

.timer__accent-checkbox {
  vertical-align: middle;
}
</style>