export const loadGame = async (playerAddress) => {
  const response = await fetch(`/api/load-game?playerAddress=${playerAddress}`);
  return response.json();
};

export const storeGame = async (firstPlayerAddress, secondPlayerAddress, gameAddress) => fetch('/api/store-game', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ firstPlayerAddress, secondPlayerAddress, gameAddress }),
});

export const closeGame = async (gameAddress) => {
  const response = await fetch('/api/close-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gameAddress }),
  });
  return await response.json();
};
