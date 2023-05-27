import { useEffect, useState } from "react";

import { IPokemon } from "../Helpers/Interfaces";
import { setGen } from "../Helpers/setGen";
import { setPkmnType } from "../Helpers/setPkmnType";

const usePkmnTotal = () => {
  const [total, setTotal] = useState<number>(0);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      const json = await data.json();
      setTotal(json.count);
    };
    fetchTotal().catch((error) => {
      console.error(error.message);
    });
  }, []);

  return { total };
};
export default usePkmnTotal;
