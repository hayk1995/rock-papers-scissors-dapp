let games = [];

export const getGames = () => games;

export const addGame = (game) => {
  games.push(game);
};

export const deleteGame = (gameAddress) => {
  games = games.filter((game) => game.gameAddress !== gameAddress);
};
