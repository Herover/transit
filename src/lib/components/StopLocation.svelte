<script lang="ts">
  // This component is a physical location at a stop at which specific vehicles arrive, ex. metro
  // track 1
  import Vehicle from './Vehicle.svelte';
  import type { Vehicle as tVehicle } from './../type.ts';
  import { T } from '@threlte/core';
  import { HTML } from '@threlte/extras';
  import Metro from './models/metro.svelte';

  export let vehicles: tVehicle[] = [];
  export let label: string = "";
  export let width: number = 4;
  export let direction: number = 1;
  export let color = "#ffffff";
</script>

{#each vehicles as vehicle (vehicle.id)}
  <Vehicle vehicle={vehicle}>
    <Metro />
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
