

// From API responses
export interface DepartureBoardResponse {
  DepartureBoard: DepartureBoard;
};
export interface DepartureBoard {
  noNamespaceSchemaLocation: string;
  Departure: BoardItem[];
};
export interface ArrivalBoardResponse {
  ArrivalBoard: ArrivalBoard;
};
export interface ArrivalBoard {
  noNamespaceSchemaLocation: string;
  Arrival: BoardItem[];
};
export interface BoardItem {
  name: string;
  type: string;
  stop: string;
  time: string;
  date: string;
  id: string;
  messages: string;
  track: string;
  rtTime: string;
  rtDate: string;
  rtTrack: string;
  finalStop: string;
  direction: string;
  cancelled?: boolean;
  JourneyDetailRef: {
      ref: string,
  };
};


export interface Station {
  id: number;
}


const baseURL = "http://xmlopen.rejseplanen.dk/bin/rest.exe";
const staticParameters = "&format=json";

export const getDepartures = async (stationId: number): Promise<DepartureBoardResponse> => {
  const now = new Date();
  const offset = 2;
  const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear().toString().substr(2)}`;
  const response = await fetch(`${baseURL}/departureBoard?id=${stationId}&date=${date}&offsetTime=${offset}${staticParameters}`)
  const data = await response.json()
  return data as DepartureBoardResponse;
}

export const getArrivals = async (stationId: number): Promise<ArrivalBoardResponse> => {
  const now = new Date();
  const offset = 2;
  const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear().toString().substr(2)}`;
  const response = await fetch(`${baseURL}/arrivalBoard?id=${stationId}&date=${date}&offsetTime=${offset}${staticParameters}`)
  const data = await response.json()
  return data as ArrivalBoardResponse;
}
