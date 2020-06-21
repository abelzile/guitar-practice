import PredefinedExercisesPageComponent from "../components/PredefinedExercisesPageComponent";
import RandomExercisesPageComponent from "../components/RandomExercisesPageComponent";
import ScalesPageComponent from "../components/ScalesPageComponent";
import MetronomePageComponent from "../components/MetronomePageComponent";

export default [
  {path: '/', component: PredefinedExercisesPageComponent},
  {path: '/predefined', component: PredefinedExercisesPageComponent},
  {path: '/random', component: RandomExercisesPageComponent},
  {path: '/scales', component: ScalesPageComponent},
  {path: '/metronome', component: MetronomePageComponent}
];