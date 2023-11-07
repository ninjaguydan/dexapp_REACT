// Get list of all current Pokemon Types

import { TYPE_API } from "api/urls";
import useSWR from "swr";

interface TYPES_JSON {
  count: number;
  next: number | null;
  previous: number | null;
  results: {
    name: string;
    url: string;
  }[];
}

async function fetchAllTypes(url: string) {
  const response: Response = await fetch(url);
  const json: TYPES_JSON = await response.json();

  let typeMap: { [key: string]: number } = {};

  json.results.forEach(async (result, index) => {
    typeMap[result.name] = index + 1;
  });

  return typeMap;
}

export default function useFetchAllTypes() {
  const { data: TYPE_MAP, isLoading } = useSWR(TYPE_API, fetchAllTypes);
  return { TYPE_MAP, isLoading };
}
