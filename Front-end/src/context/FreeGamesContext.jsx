import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const FreeGamesContext = createContext();

export function FreeGamesProvider({ children }) {


  const [freeGames, setFreeGames] = useState();



  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': '207ccbce86msh52476e47960b2e8p111995jsnb52e556e58de',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {

      setFreeGames(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  return (
    <>
      <FreeGamesContext.Provider
        value={{
          freeGames
        }}
      >
        {children}
      </FreeGamesContext.Provider>
    </>
  );
}
