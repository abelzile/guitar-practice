<template>
  <div>
    <vue-headful title="Guitar Practice - Scales" />
    <h1>-~ Scales ~-</h1>
    <div>
      <select v-model="selectedScaleId">
        <option disabled value="">Select a scale...</option>
        <option v-for="s in allScales" v-bind:value="s.id">
          {{ s.name }}
        </option>
      </select>
    </div>
    <div>
      <ScaleTabComponent v-bind:scaleId="selectedScaleId"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ScaleTabComponent from './ScaleTabComponent'

  export default {
    components: {
      ScaleTabComponent
    },
    data: function() {
      return {
        selectedScaleId: ''
      }
    },
    computed: {
      ...mapGetters({
        allScales: 'getAllScales'
      })
    },
  }
</script>

<style scoped>

</style>