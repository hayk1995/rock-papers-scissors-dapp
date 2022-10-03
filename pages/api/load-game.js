import { getGames } from '../../game-repo';

export default function handler(req, res) {
  const { playerAddress } = req.query;
  const games = getGames();
  const game = games.find((game) => playerAddress.toUpperCase() === game.firstPlayerAddress.toUpperCase()
        || playerAddress.toUpperCase() === game.secondPlayerAddress.toUpperCase());
  res.status(200).json(game || null);
}
