import Vue from 'vue'
import Vuex from 'vuex'
import D from './chord-data/d.json'
import A from './chord-data/a.json'
import E from './chord-data/e.json'
import G from './chord-data/g.json'
import C from './chord-data/c.json'
import Dm from './chord-data/dm.json'
import Am from './chord-data/am.json'
import Em from './chord-data/em.json'
import G7 from './chord-data/g7.json'
import C7 from './chord-data/c7.json'
import B7 from './chord-data/b7.json'
import A7 from './chord-data/a7.json'
import D7 from './chord-data/d7.json'
import E7 from './chord-data/e7.json'
import Fmaj7 from './chord-data/fmaj7.json'
import F from './chord-data/f.json'
import Falt1 from './chord-data/falt1.json'
import Falt2 from './chord-data/falt2.json'
import Level1 from './chord-change-exercise-data/level-1'
import Level2 from './chord-change-exercise-data/level-2'
import Level3 from './chord-change-exercise-data/level-3'
import Level4 from './chord-change-exercise-data/level-4'
import MinorPentatonic from './scale-data/minor-pentatonic.json'
import MajorIonian from './scale-data/major-(ionian).json'
import Dorian from './scale-data/dorian.json'
import {TimerLengthMs, MotivationalStrings} from '../src/consts.js';
import ArrayUtils from '../src/array-utils.js'

Vue.use(Vuex);

const state = {
  chords: [
    D,
    A,
    E,
    G,
    C,
    Dm,
    Am,
    Em,
    G7,
    C7,
    B7,
    Fmaj7,
    A7,
    D7,
    E7,
    F,
    Falt1,
    Falt2
  ],
  scales: [
    MinorPentatonic,
    MajorIonian,
    Dorian
  ],
  chordChangeExercises: [
    Level1,
    Level2,
    Level3,
    Level4,
  ],
  exerciseTimer: {
    id: "",
    timeMs: TimerLengthMs,
    bpm: null,
    accent: true,
    metronomeSoundId: 1
  },
  exerciseHistory: []
};

const getters = {
  getAllChords(state) {
    return state.chords;
  },
  getChord(state, getters) {
    return (name) => getters.getAllChords.find(chord => chord.name === name);
  },
  getAllChordChangeExercises(state) {
    return state.chordChangeExercises;
  },
  getExerciseTimeMs(state) {
    return state.exerciseTimer.timeMs;
  },
  getExerciseId(state) {
    return state.exerciseTimer.id;
  },
  getBpm(state) {
    return state.exerciseTimer.bpm;
  },
  getAllExerciseHistory(state) {
    return state.exerciseHistory;
  },
  getExerciseHistoryEntry(state, getters) {
    return (exerciseId) => getters.getAllExerciseHistory.find(eh => eh.id === exerciseId);
  },
  getAllScales(state) {
    return state.scales;
  },
  getScale(state, getters) {
    return (id) => getters.getAllScales.find(scale => scale.id === id);
  }
};

const mutations = {
  setExerciseTimerId(state, id) {
    state.exerciseTimer.id = id;
  },
  updateTimer(state, timeMs) {
    state.exerciseTimer.timeMs = timeMs;
  },
  addCurrentExerciseToHistory(state) {
    const exerciseId = state.exerciseTimer.id;
    const index = state.exerciseHistory.findIndex(el => el.id === exerciseId);
    const newHist = {
      id: exerciseId,
      date: new Date(),
      message: ArrayUtils.random(MotivationalStrings)
    };

    if (index === -1) {
      state.exerciseHistory.push(newHist)
    } else {
      Vue.set(state.exerciseHistory, index, newHist);
    }
  },
  setBpm(state, bpm) {
    state.exerciseTimer.bpm = bpm;
  },
  setAccent(state, accent) {
    state.exerciseTimer.accent = accent;
  },
  setMetronomeSoundId(state, metronomeSoundId) {
    state.exerciseTimer.metronomeSoundId = metronomeSoundId;
  }
};

const actions = {
  startTimer(context, { id, timeMs }) {
    context.commit('setExerciseTimerId', id);
    context.commit('updateTimer', timeMs);
  },
  stopTimer(context, { addHistory }) {
    if (addHistory) {
      context.commit('addCurrentExerciseToHistory');
    }
    context.commit('setExerciseTimerId', '');
  },
  updateTimer(context, timeMs) {
    context.commit('updateTimer', timeMs);
  },
  updateBpm(context, bpm) {
    context.commit('setBpm', bpm);
  },
  updateAccent(context, accent) {
    context.commit('setAccent', accent);
  },
  updateMetronomeSoundId(context, metronomeSoundId) {
    context.commit('setMetronomeSoundId', metronomeSoundId);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: true
})