import { writable } from 'svelte/store';

import { getArrivals, getDepartures } from '$lib/departure-board';
import type { Vehicle } from '$lib/type';

const stampsToDate = (date: string, time: string): number => {
  const [dayStr, monthStr, YrStr] = date.split(".");
  const [hourStr, minuteStr] = time.split(":");
  return Date.parse(`20${YrStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:00+02:00`);
}

export const createRejseplanenTavle = (locationId: number) => {
  let vehicles: Vehicle[] = [];

	const { subscribe, set, update } = writable(vehicles);

  let now = 0;
  let updateInterval = 0;
  let cleanupInterval = 0;

  let updateTime = 1000*60*5;
  let cleanupTime = 1000*5;

  const updateVehicles = async () => {
    // Kbh. H. 8600626, Ørestad 8600856
    const departures = await getDepartures(locationId);
    const arrivals = await getArrivals(locationId);

    arrivals.ArrivalBoard.Arrival.forEach((arrival) => {
      if (arrival.type == "M") {
        return;
      }
      const identifier = `${arrival.id}-${arrival.name}`;
      let item = vehicles.find(e => e.id == identifier);
      if (!item) {
        item = {
          id: identifier,
          name: arrival.name,
          timeOfArrival: 0,
          timeOfDeparture: 0,
          actualTimeOfArrival: 0,
          actualTimeOfDeparture: 0,
          cancelled: false,
          type: arrival.type,
          line: arrival.line,
          extra: { arrival }
        }
        vehicles.push(item);
      }
      item.cancelled = arrival.cancelled || false;

      const planned =
        stampsToDate(arrival.date, arrival.time);
      const expected =
        stampsToDate(arrival.rtDate || arrival.date, arrival.rtTime || arrival.time);
      const diff = expected - planned;

      item.timeOfArrival = planned;
      item.arrivalDelay = diff;
      if (!item.timeOfDeparture) {
        item.timeOfDeparture = item.timeOfArrival + 1000*30;
      }

      item.actualTimeOfArrival = item.timeOfArrival + (item.arrivalDelay || 0);
      item.actualTimeOfDeparture = item.timeOfDeparture + (item.departureDelay || 0);

      item.track = arrival.rtTrack || arrival.track;

      item.extra.arrival = arrival;
      set(vehicles);
    });
    departures.DepartureBoard.Departure.forEach((departure) => {
      const identifier = departure.type == "M" ? `${departure.id}-${departure.time}` : `${departure.id}-${departure.name}`
      let item = vehicles.find(e => e.id == identifier);
      if (!item) {
        item = {
          id: identifier,
          name: departure.name,
          timeOfArrival: 0,
          timeOfDeparture: 0,
          actualTimeOfArrival: 0,
          actualTimeOfDeparture: 0,
          cancelled: false,
          type: departure.type,
          line: departure.line,
          extra: { departure },
        }
        vehicles.push(item);
      }
      item.cancelled = departure.cancelled || false;

      const planned =
        stampsToDate(departure.date, departure.time);
      const expected =
        stampsToDate(departure.rtDate || departure.date, departure.rtTime || departure.time);
      const diff = expected - planned;

      item.timeOfDeparture = planned;
      item.departureDelay = diff;
      if (!item.timeOfArrival) {
        item.timeOfArrival = item.timeOfDeparture;
        item.timeOfDeparture = item.timeOfDeparture + 1000*30;
      }
      if (item.timeOfArrival >= item.timeOfDeparture) {
        item.timeOfDeparture += 1000*30;
      }

      item.actualTimeOfArrival = item.timeOfArrival + (item.arrivalDelay || 0);
      item.actualTimeOfDeparture = item.timeOfDeparture + (item.departureDelay || 0);

      item.track = departure.rtTrack || departure.track;

      item.extra.departure = departure;
      set(vehicles);
    });

    vehicles = vehicles;
  };

  const cleanup = () => {
    vehicles = vehicles.filter(item => item.actualTimeOfDeparture + 1000*30 > Date.now());
    now = Date.now();
  }

	return {
		subscribe,
		startUpdating: () => {
      updateInterval = setInterval(updateVehicles, updateTime);
      cleanupInterval = setInterval(cleanup, cleanupTime);
      updateVehicles();
    },
    stopUpdating: () => {
      clearInterval(updateInterval);
      clearInterval(cleanupInterval);
    },
    reset: () => set([]),
	};
}
