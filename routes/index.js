import PredefinedExercisesPageComponent from "../components/PredefinedExercisesPageComponent";
import RandomExercisesPageComponent from "../components/RandomExercisesPageComponent";

export default [
  {path: '/', component: PredefinedExercisesPageComponent},
  {path: '/predefined', component: PredefinedExercisesPageComponent},
  {path: '/random', component: RandomExercisesPageComponent}
];