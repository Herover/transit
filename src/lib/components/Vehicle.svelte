<script lang="ts">
  import { SceneGraphObject, T } from '@threlte/core'
  import { tweened, type Tweened } from 'svelte/motion';
  import type { Vehicle as tVehicle } from './../type.ts';
  import { cubicIn, cubicInOut, cubicOut, linear } from 'svelte/easing';
  import { onDestroy } from 'svelte';
  import { HTML } from '@threlte/extras';
  import type { Group } from 'three';

  export let vehicle: tVehicle;

  let position = tweened(1000, {
    duration: 0,
    easing: cubicInOut,
  });

  let state: "UNKNOWN" | "APPROACHING" | "WAITING" | "LEAVING" = "UNKNOWN";
  const updateState = () => {
    if (vehicle.actualTimeOfArrival > Date.now() + 1000 * 10 && state == "UNKNOWN") {
      state = "APPROACHING";
      position.set(0, {
        duration: (vehicle.actualTimeOfArrival - Date.now()),
        easing: cubicOut,
      });
    } else if (vehicle.actualTimeOfArrival < Date.now() && vehicle.actualTimeOfDeparture > Date.now() && (state == "APPROACHING" || state == "UNKNOWN")) {
      if (state == "UNKNOWN") {
        position.set(0, {
          duration: 0,
          easing: linear,
        });
      }
      state = "WAITING";
    } else if (vehicle.actualTimeOfDeparture < Date.now() && (state == "WAITING" || state == "UNKNOWN")) {
      if (state == "UNKNOWN") {
        position.set(0, {
          duration: 0,
          easing: linear,
        });
      }
      position.set(-1000, {
        duration: 10000,
        easing: cubicIn,
      });
      state = "LEAVING";
    }
  };
  updateState(); 
  
  let refreshInterval = setInterval(updateState, 1000);
  onDestroy(() => clearInterval(refreshInterval));

  $: console.log(state)
  // $: console.log(Math.floor((vehicle.timeOfArrival - Date.now())/1000), $position)
</script>


{#if $$slots.default}
  <T.Group
    position.z={$position}
    on:click={() => console.log(vehicle, state)}
  >
    <slot />
  </T.Group>
{:else}
  <T.Mesh
    position.y={0.5}
    position.z={$position}
    position.x={0}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#0059BA" />
    <T.Group rotation.y={-Math.PI/2}>
      <HTML
        position.y={1.25}
        transform
      >
        <span style="color: white">{vehicle.name} - {state}</span>
      </HTML>
    </T.Group>
  </T.Mesh>
{/if}
