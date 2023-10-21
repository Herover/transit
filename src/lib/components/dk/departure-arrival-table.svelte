<script lang="ts">
  import type { Vehicle } from "$lib/type";

  export let vehicles: Vehicle[] = [];
</script>

<style>
  table {
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace
  }
  td, th {
    min-width: 100px;
  }
  td:first-child, th:first-child {
    min-width: 100px;
  }
  .cancelled {
    color: #888888;
    text-decoration: line-through;
  }
  .delay {
    color: #ff8888;
  }
</style>

<table>
  <tr>
    <th>Name</th>
    <th>Arr.</th>
    <th>Dep.</th>
  </tr>
  {#each vehicles.sort((a, b) => a.timeOfArrival - b.timeOfArrival) as vehicle}
    <tr class:cancelled={vehicle.cancelled}>
      <td>
        {vehicle.name}
      </td>
      <td>
        {(new Date(vehicle.timeOfArrival).getHours() + "").padStart(2, "0")}:{(new Date(vehicle.timeOfArrival).getMinutes() + "").padStart(2, "0")}
        {#if vehicle.arrivalDelay}
          <span class="delay">
            {#if vehicle.arrivalDelay > 0}+{/if}{vehicle.arrivalDelay/(1000*60)}
          </span>
        {/if}
      </td>
      <td>
        {(new Date(vehicle.timeOfDeparture).getHours() + "").padStart(2, "0")}:{(new Date(vehicle.timeOfDeparture).getMinutes() + "").padStart(2, "0")}
        {#if vehicle.departureDelay}
          <span class="delay">
            {#if vehicle.departureDelay > 0}+{/if}{vehicle.departureDelay/(1000*60)}
          </span>
        {/if}
      </td>
    </tr>
  {/each}
</table>
