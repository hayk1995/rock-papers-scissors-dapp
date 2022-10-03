import { addGame } from '../../game-repo';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  addGame(req.body);

  res.status(200).send();
}
