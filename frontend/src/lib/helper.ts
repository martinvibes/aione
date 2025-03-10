// Helper function to short address
export function stringSlice(data: string) {
  const userAddressStart = data.slice(0, 20);
  if (data.length > 25) return `${userAddressStart}......`;
  return `${userAddressStart}`;
}

const sonicTokensAddress = [
  { name: "sonic", address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
  { name: "anon", address: "0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C" },
  { name: "wagmi", address: "0x0e0Ce4D450c705F8a0B6Dd9d5123e3df2787D16B" },
];
export const getTransactionUrl = (hash: string) => {
  if (hash.includes("https")) {
    return hash;
  }
  return `https://sonicscan.org/tx/${hash}`;
};

export type data = {
  name: string;
  address: string;
}[];

export function getLocalSstorageAddress() {
  const storgedata = localStorage.getItem("contact");
  if (storgedata !== null) {
    const fetchData = JSON.parse(storgedata ?? "");
    return fetchData;
  } else {
    return [];
  }
}

export function setLocalStorageAddress(data: data) {
  localStorage.setItem("contact", JSON.stringify(data));
}

export function getLocalStorageTokens() {
  const storgedata = localStorage.getItem("tokens");
  if (storgedata !== null) {
    const fetchData = JSON.parse(storgedata ?? "");
    return fetchData;
  } else {
    return [];
  }
}

export function setLocalStorageTokens(data: data) {
  localStorage.setItem("tokens", JSON.stringify(data));
}

setLocalStorageTokens(sonicTokensAddress);
