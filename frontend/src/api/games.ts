export async function fetchLiveGames() {

  const response = await fetch(
    "${import.meta.env.VITE_API_URL}/api/games/live"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}

export async function fetchGameById(
  id: string
) {

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/games/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game");
  }

  return response.json();
}

export async function fetchRealGames() {

  const response = await fetch(
    "${import.meta.env.VITE_API_URL}/api/games/real"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch real games"
    );
  }

  return response.json();
}

export async function
fetchGameHistory(id: string) {

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/games/${id}/history`
    );

  return response.json();
}