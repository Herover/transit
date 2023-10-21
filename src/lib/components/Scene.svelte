<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Grid, HTML, OrbitControls, interactivity } from '@threlte/extras'
  import type { Vehicle } from './../type.ts';
  import DepartureArrivalTable from './dk/departure-arrival-table.svelte';

  export let vehicles: Vehicle[] = [];

  export let cameraTarget: number[];
  export let fov: number = 15;
  export let cameraDistance: number = 40;

  interactivity();
</script>

<HTML calculatePosition={() => [0, 0]}>
  <DepartureArrivalTable {vehicles} />
</HTML>

<T.PerspectiveCamera
  makeDefault
  position.x={cameraTarget[0] - cameraDistance}
  position.y={cameraTarget[1] + cameraDistance}
  position.z={cameraTarget[2] + cameraDistance}
  {fov}
>
  <OrbitControls
    autoRotate
    enableZoom={false}
    enableDamping
    autoRotateSpeed={0}
    target={cameraTarget}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={1}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={1} />

<Grid
  position.y={0}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={300}
  cellSize={10}
  gridSize={1000}
/>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

<slot />
