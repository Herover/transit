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
    console.log(v.line)
    
    if (v.line == "M1") {
      console.log("M1");
      return "#007F60";
    } else if (v.line == "M2") {
      console.log("M2");
      return "#FEC20F";
    } else if (v.line == "M3") {
      console.log("M3");
      return "#F8001F";
    } else if (v.line == "M4") {
      console.log("M4");
      return "#00A0BE";
    } else {
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
        <T.Group label={"Spor 1"} position.x={6}>
          <StopLocation
            {vehicleColor}
            vehicles={visibleVehicles.filter(e => e.track == "1" && TYPES_TRAINS.includes(e.type))}
          />
        </T.Group>
        <T.Group label={"Spor 2"} position.x={-6} direction={-1}>
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
        <T.Group label={"Spor 4"} position.x={20} direction={-1}>
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
        <T.Group label={"Spor 2"} position.x={-6} direction={-1}>
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
