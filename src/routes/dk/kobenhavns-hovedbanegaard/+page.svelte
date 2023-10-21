<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { T } from '@threlte/core'

  import Scene from '$lib/components/Scene.svelte'
  import StopLocation from '$lib/components/StopLocation.svelte';
  import type { Vehicle } from '$lib/type';
  import { createRejseplanenTavle } from '$lib/stores/rejseplanen-store';
  import { onDestroy, onMount } from 'svelte';

  let rejseplanStore = createRejseplanenTavle(8600626);
  const cameraTarget = [-13, 1.5, 0];

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


</script>

<div>
  <Canvas>
    <Scene
      vehicles={visibleVehicles}
      {cameraTarget}
    >
      <T.Group label={"?"} position.x={2}>
        <StopLocation vehicles={visibleVehicles.filter(e => !TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 1"} position.x={0}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "1" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 2"} position.x={-3}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "2" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 3"} position.x={-4}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "3" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 4"} position.x={-7}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "4" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 5"} position.x={-8}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "5" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 6"} position.x={-11}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "6" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 7"} position.x={-12}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "7" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 8"} position.x={-15}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "8" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 9"} position.x={-16}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "9" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 10"} position.x={-19}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "10" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 11"} position.x={-20}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "11" && TYPES_TRAINS.includes(e.type))}/>
      </T.Group>
      <T.Group label={"Track 12"} position.x={-23}>
        <StopLocation vehicles={visibleVehicles.filter(e => e.track == "12" && TYPES_TRAINS.includes(e.type))}/>
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
