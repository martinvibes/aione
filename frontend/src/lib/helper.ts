// Helper function to short address
export function stringSlice(data: string) {
  const userAddressStart = data.slice(0, 20);
  if(data.length >25) return `${userAddressStart}......`;
  return `${userAddressStart}`;
}
