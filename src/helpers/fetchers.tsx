import {DataModel} from "./data"



export async function fetchData(endpoint: string): Promise<DataModel> {
  const response = await fetch(endpoint);

  const data = await response.json();

  const ret = new DataModel(data.tickets, data.users);

  return ret;
}
