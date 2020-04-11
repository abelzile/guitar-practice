<template>
  <svg version="1.1"
       baseProfile="full"
       width="300" height="410"
       xmlns="http://www.w3.org/2000/svg">

    <!--border-->
    <rect x="1" y="1" width="298" height="400" stroke="black" stroke-width="2" fill="none"/>

    <!--frets-->
    <line v-for="(value, index) in 8"
          x1="25"
          :y1="25 + (index * 50)"
          x2="275"
          :y2="25 + (index * 50)"
          stroke="black"
          stroke-width="1"/>

    <!--strings-->
    <line v-for="(value, index) in 6"
          :x1="25 + (50 * index)"
          y1="25"
          :x2="25 + (50 * index)"
          y2="375"
          stroke="black"
          stroke-width="1"/>

    <!--fingers-->
    <template v-for="fing in scale.fingers">
      <circle v-bind="getFingerAttrs(fing)"
              r="20"
              fill="black"/>
    
      <text v-bind="getFingerNumAttrs(fing)"
            fill="#FFF8DC"
            font-size="30px"
            text-anchor="middle">{{ fing.finger }}
      </text>
    </template>

  </svg>
</template>
<script>
  import {NoScale} from '../src/consts.js';

  export default {
    props: {
      scaleId: String
    },
    methods: {
      getFingerAttrs(finger) {
        return {
          cx: (6 - finger.string) * 50 + 25,
          cy: (finger.fret - 1) * 50 + 50
        }
      },
      getFingerNumAttrs(finger) {
        return {
          x: (6 - finger.string) * 50 + 25,
          y: (finger.fret - 1) * 50 + 60
        }
      }
    },
    computed: {
      scale() {
        const scl = this.$store.getters.getScale(this.scaleId);
        if (!scl) {
          return NoScale;
        }
        return scl;
      },
      scaleFinger() {
        return (fingerNum) => this.scale.fingers.find(f => f.finger === fingerNum);
      }
    }
  }

</script>
<style scoped>
</style>