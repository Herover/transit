<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { T } from '@threlte/core'

  import Scene from '$lib/components/Scene.svelte'
  import StopLocation from '$lib/components/StopLocation.svelte';
  import type { Vehicle } from '$lib/type';
  import { createRejseplanenTavle } from '$lib/stores/rejseplanen-store';
  import { onDestroy, onMount } from 'svelte';

  let rejseplanStore = createRejseplanenTavle(8600646);
  const cameraTarget = [15, -30, 15];

  let vehicles: Vehicle[] = [];
  rejseplanStore.subscribe((d) => vehicles = d);
  onMount(async () => {
    rejseplanStore.startUpdating();
  });
  onDestroy(() => {
    rejseplanStore.stopUpdating();
  });
  
  $: visibleVehicles = vehicles
    .filter(v =>
      !v.cancelled
      // && v.actualTimeOfArrival - 1000*60 < now
    );
  $: console.log(visibleVehicles)

  const TYPES_TRAINS = ["S", "REG", "LYN", "IC"]; // Possibly incomplete

  const vehicleColor = (v: Vehicle) => {
    if (v.line == "M1") {         // Metro
      return "#007F60";
    } else if (v.line == "M2") {
      return "#FEC20F";
    } else if (v.line == "M3") {
      return "#F8001F";
    } else if (v.line == "M4") {
      return "#00A0BE";
    } else if (v.line == "A") {   // S-Tog
      return "#15a4dd";
    } else if (v.line == "B") {
      return "#4baa47";
    } else if (v.line == "Bx") {
      return "#77c044";
    } else if (v.line == "C") {
      return "#f68620";
    } else if (v.line == "E") {
      return "#6b67af";
    } else if (v.line == "F") {
      return "#ffc225";
    } else if (v.line == "H") {
      return "#ef4236";
  } else {                        // Other
      return "#ffffff";
    }
  }
</script>

<div>
  <Canvas>
    <Scene
      vehicles={visibleVehicles}
      {cameraTarget}
      cameraDistance={200}
    >
      <T.Group position.y={-20}>
        <T.Group label={"Spor 1"} position.x={-6}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "1" && TYPES_TRAINS.includes(e.type))}
          />
        </T.Group>
        <T.Group label={"Spor 2"} position.x={6} rotation.y={Math.PI}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "2" && TYPES_TRAINS.includes(e.type))}
          />
        </T.Group>
        <T.Group label={"Spor 3"} position.x={11}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "3" && TYPES_TRAINS.includes(e.type))}
          />
        </T.Group>
        <T.Group label={"Spor 4"} position.x={20} rotation.y={Math.PI}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "4" && TYPES_TRAINS.includes(e.type))}
          />
        </T.Group>
      </T.Group>
      <T.Group position.y={-40} rotation.y={Math.PI/2}>
        <T.Group label={"Spor 1"} position.x={6}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "1" && e.type == "M")}
          />
        </T.Group>
        <T.Group label={"Spor 2"} position.x={-6} rotation.y={Math.PI}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "2" && e.type == "M")}
          />
        </T.Group>
      </T.Group>
    </Scene>
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
</style>
