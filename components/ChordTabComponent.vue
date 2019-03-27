<template>
  <svg version="1.1"
       baseProfile="full"
       width="300" height="400"
       xmlns="http://www.w3.org/2000/svg">

    <rect x="1" y="1" width="298" height="398" stroke="black" stroke-width="2" fill="none"/>

    <text x="50%"
          y="50"
          fill="black"
          font-size="50px"
          text-anchor="middle">{{ chord.name }}
    </text>

    <!--frets-->
    <line v-for="(value, index) in 6"
          x1="25"
          :y1="100 + (index * 50)"
          x2="275"
          :y2="100 + (index * 50)"
          stroke="black"
          stroke-width="1"/>

    <!--nut-->
    <line x1="25" y1="100" x2="275" y2="100" stroke="black" stroke-width="10"/>

    <!--strings-->
    <line v-for="(value, index) in 6"
          :x1="25 + (50 * index)"
          y1="100"
          :x2="25 + (50 * index)"
          y2="350"
          stroke="black"
          stroke-width="1"/>

    <!--strum-->
    <template v-for="(strum, index) in strums">
      <template v-if="strum === false">
        <line :x1="15 + (50 * index)"
              y1="65"
              :x2="35 + (50 * index)"
              y2="85"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"/>
        <line :x1="15 + (50 * index)"
              y1="85"
              :x2="35 + (50 * index)"
              y2="65"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"/>
      </template>
      <template v-else-if="strum === true">
        <circle r="12"
                :cx="25 + (50 * index)"
                cy="75"
                stroke="black"
                stroke-width="3"
                fill="none"/>
      </template>
    </template>

    <!--fingers-->
    <template v-for="fing in chord.fingers">
      <template v-if="!isBarre(fing)">
        <circle v-bind="getFingerAttrs(fing.finger)"
                r="20"
                fill="black"/>
      </template>
      <template v-else>
        <rect v-bind="getFingerAttrs(fing.finger)" 
              rx="19" 
              ry="19" 
              height="38"
              stroke="0"
              fill="black"/>
      </template>
      <text v-bind="getFingerNumAttrs(fing.finger)"
              fill="#FFF8DC"
              font-size="30px"
              text-anchor="middle">{{ fing.finger }}
        </text>
    </template>
  </svg>
</template>
<script>

  export default {
    props: {
      chordName: String
    },
    methods: {
      getFingerAttrs(fingerNum) {
        const finger = this.chordFinger(fingerNum);
        
        if (this.isBarre(finger)) {
          const strings = finger.string;
          const lowString = Math.max(...strings);

          return {
            width: strings.length * 50 - 20,
            x: (6 - lowString) * 50 + 10,
            y: (finger.fret - 1) * 50 + 108
          }
        } else {
          return {
            cx: (6 - finger.string) * 50 + 25,
            cy: (finger.fret - 1) * 50 + 125
          }
        }
      },
      getFingerNumAttrs(fingerNum) {
        const finger = this.chordFinger(fingerNum);

        if (this.isBarre(finger)) {
          const strings = finger.string;
          const lowString = Math.max(...strings);
          const x = (6 - lowString) * 50 + 10;
          const width = strings.length * 50 - 20;

          return {
            x: (width / 2) + x,
            y: (finger.fret - 1) * 50 + 135
          }
        } else {
          return {
            x: (6 - finger.string) * 50 + 25,
            y: (finger.fret - 1) * 50 + 135
          }
        }
      },
      isBarre(finger) {
        return Array.isArray(finger.string);
      }
    },
    computed: {
      chord() {
        return this.$store.getters.getChord(this.chordName);
      },
      chordFinger() {
        return (fingerNum) => this.chord.fingers.find(f => f.finger === fingerNum);
      },
      strums() {
        const doStrums = [false, false, false, false, false, false];
        for (const s of this.chord.strum) {
          doStrums[6 - s] = true;
        }
        for (const f of this.chord.fingers) {
          doStrums[6 - f.string] = null;
        }
        return doStrums;
      }
    }
  }

</script>
<style scoped>
</style>