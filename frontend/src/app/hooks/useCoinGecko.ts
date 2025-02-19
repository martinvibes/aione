export async function fetchCoinGeckoPrice(token: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
    },
  };

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token.toLowerCase()}&vs_currencies=usd&include_market_cap=true`,
      options
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err instanceof Error ? err : new Error("Failed to fetch");
  }
}
