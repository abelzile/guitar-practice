<template>
  <div>
    <h1>-~ Random Chord Changes ~-</h1>
    <div>
      <template v-for="(item, index) in allChords">
        <span v-bind:key="item.name">
          <label>
            <input type="checkbox"
                  v-model="selectedChords"
                  v-bind:key="item.name"
                  v-bind:value="item"/>
            {{item.name}}
          </label> 
          <br v-bind:key="item.name"
              v-if="index > 0 && (index + 1) % 10 === 0"/>
        </span>
      </template>
    </div>
    <div>
      Number of Exercises:
      <input v-model="numberOfExercises"
             type="number"
             min="1"
             max="100"
             step="1"
             style="width: 4em"/>
      <input type="button" value="Regenerate" @click="generateExercises" />
    </div>
    <ChordChangeExerciseComponent
        v-for="(item, index) in exercises"
        v-bind:key="item.id"
        v-bind:exercise="item"
        v-bind:exercise-num="index + 1"/>
  </div>
</template>

<script>
  import uuidV4 from 'uuid/v4'
  import {mapGetters} from 'vuex'
  import ArrayUtils from '../src/array-utils.js';
  import ChordChangeExerciseComponent from './ChordChangeExerciseComponent.vue'

  export default {
    components: {
      ChordChangeExerciseComponent
    },
    data: function() {
      return {
        numberOfExercises: 12,
        exercises: [],
        selectedChords: []
      }
    },
    methods: {
      generateExercises() {
        ArrayUtils.clear(this.exercises);

        const numOfExercises = parseInt(this.numberOfExercises, 10);

        if (!this.validateNumOfExercises(numOfExercises)){
          return;
        }

        let availChordNames = ArrayUtils.shuffle(this.getSelectedChords());

        if (availChordNames.length < 1) {
          return;
        }

        for (let i = 0; i < numOfExercises; ++i) {
          this.exercises.push({
            id: uuidV4(),
            chords: [
              availChordNames.pop(),
              availChordNames.pop()
            ]
          });

          if (availChordNames.length <= 1) {
            let remaining = null;
            if (availChordNames.length === 1) {
              remaining = availChordNames.pop();
            }

            availChordNames = ArrayUtils.shuffle(this.getSelectedChords());

            if (remaining) {
              const index = availChordNames.indexOf(remaining);
              availChordNames.splice(index, 1);
              availChordNames.push(remaining);
            }
          }
        }
      },
      getSelectedChords() {
        return this.allChords
          .filter(x => this.selectedChords.findIndex(y => y.name === x.name) > -1)
          .map(x => x.name)
      },
      shuffle(array) {
        return ArrayUtils.shuffle(array);
      },
      validateNumOfExercises(val) {
        if (!Number.isInteger(val)) {
          return false;
        }
        return 1 <= val && val <= 100;
      }
    },
    computed: {
      ...mapGetters({
        allChords: 'getAllChords'
      })
    },
    mounted() {
      this.selectedChords.push(...this.allChords);
      this.generateExercises();
    }
  }
</script>

<style scoped>
  .exercise-list__divider {
    width:608px;
    margin-top:20px;
    margin-bottom: 20px;
  }
</style>