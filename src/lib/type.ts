export interface Vehicle {
  id: string,
  name: string,
  timeOfArrival: number, // Unix date
  timeOfDeparture: number, // Unix date
  arrivalDelay?: number, // In milliseconds
  departureDelay?: number, // In milliseconds
  actualTimeOfArrival: number, // timeOfArrival + delay, Unix date
  actualTimeOfDeparture: number, // timeOfDeparture + delay, Unix date
  cancelled: boolean,
  extra?: any,
  type: string,

  track?: string,
};
