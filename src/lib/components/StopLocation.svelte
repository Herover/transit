<script lang="ts">
  // This component is a physical location at a stop at which specific vehicles arrive, ex. metro
  // track 1
  import Vehicle from './Vehicle.svelte';
  import type { Vehicle as tVehicle } from './../type.ts';
  import { T } from '@threlte/core';
  import { HTML } from '@threlte/extras';
  import Metro from './models/metro.svelte';
  import IC from './models/ic.svelte';
  import STog from './models/s-tog.svelte';

  export let vehicles: tVehicle[] = [];
  export let label: string = "";
  export let width: number = 4;
  export let color = "#ffffff";
  export let vehicleColor: ((v: tVehicle) => string);
</script>

{#each vehicles as vehicle (vehicle.id)}
  <Vehicle vehicle={vehicle}>
    {#if vehicle.type == "M"}
      <Metro color={vehicleColor(vehicle)} />
    {:else if (vehicle.type == "REG" || vehicle.type == "IC")}
      <IC color={vehicleColor(vehicle)} />
    {:else if vehicle.type == "S"}
      <STog color={vehicleColor(vehicle)} />
    {/if}
  </Vehicle>
{/each}

<T.Mesh
  position.y={0}
  position.z={0}

>
  <T.BoxGeometry args={[width, 0.01, 100]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>

<HTML
  position.y={1.25}
  transform
>
  <span style="color: #DDDDDD">{label}</span>
</HTML>
