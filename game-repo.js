const fs = require('fs');

let games = require('./games.json');

export const getGames = () => games;

export const addGame = (game) => {
  games.push(game);
  saveData();
};

export const deleteGame = (gameAddress) => {
  games = games.filter((game) => game.gameAddress !== gameAddress);
  saveData();
};

function saveData() {
  fs.writeFileSync('./games.json', JSON.stringify(games, null, 4));
}
