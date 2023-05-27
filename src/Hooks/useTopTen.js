import { useEffect, useState } from "react";

const useTopTen = (arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[0]}`);
      const json1 = await data1.json();

      const data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[1]}`);
      const json2 = await data2.json();

      const data3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[2]}`);
      const json3 = await data3.json();

      const data4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[3]}`);
      const json4 = await data4.json();

      const data5 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[4]}`);
      const json5 = await data5.json();

      const data6 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[5]}`);
      const json6 = await data6.json();

      const data7 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[6]}`);
      const json7 = await data7.json();

      const data8 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[7]}`);
      const json8 = await data8.json();

      const data9 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[8]}`);
      const json9 = await data9.json();

      const data10 = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[9]}`);
      const json10 = await data10.json();

      setData([
        {
          id: json1.id,
          name: json1.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json1.id}.png`,
        },
        {
          id: json2.id,
          name: json2.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json2.id}.png`,
        },
        {
          id: json3.id,
          name: json3.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json3.id}.png`,
        },
        {
          id: json4.id,
          name: json4.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json4.id}.png`,
        },
        {
          id: json5.id,
          name: json5.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json5.id}.png`,
        },
        {
          id: json6.id,
          name: json6.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json6.id}.png`,
        },
        {
          id: json7.id,
          name: json7.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json7.id}.png`,
        },
        {
          id: json8.id,
          name: json8.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json8.id}.png`,
        },
        {
          id: json9.id,
          name: json9.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json9.id}.png`,
        },
        {
          id: json10.id,
          name: json10.name,
          art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json10.id}.png`,
        },
      ]);
      setIsLoading(false);
    };
    fetchData().catch((error) => {
      console.log(error.message);
    });
  }, []);

  return { data, isLoading };
};
export default useTopTen;
