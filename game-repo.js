import {equalsIgnoreCase} from "./utils/general";

let games = [];

export const getGames = () => games;

export const addGame = (game) => {
  games.push(game);
};

export const deleteGame = (gameAddress) => {
  games = games.filter((game) => !equalsIgnoreCase(game.gameAddress, gameAddress));
  console.log(gameAddress);
  console.log(games);
};

