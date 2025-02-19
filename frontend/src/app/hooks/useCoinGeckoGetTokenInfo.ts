export async function fetchCoinInfo(tokenAddr: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
      },
    };
  
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/solana/contract/${tokenAddr}`,
        options
      );
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err instanceof Error ? err : new Error("Failed to fetch");
    }
  }
  