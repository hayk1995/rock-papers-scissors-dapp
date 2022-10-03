import { deleteGame } from '../../game-repo';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { gameAddress } = req.body;
  deleteGame(gameAddress);
  res.status(200).json({});
}
