// Helper function to short address
export function stringSlice(data: string) {
  const userAddressStart = data.slice(0, 20);
  if (data.length > 25) return `${userAddressStart}......`;
  return `${userAddressStart}`;
}

export const getTransactionUrl = (hash: string) => {
  if (hash.includes("https")) {
    return hash;
  }
  return `https://sonicscan.org/tx/${hash}`;
};
