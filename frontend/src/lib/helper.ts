// Helper function to short address
export function stringSlice(data: string) {
  const userAddressStart = data.slice(0, 20);
  if (data.length > 25) return `${userAddressStart}......`;
  return `${userAddressStart}`;
}

const sonicTokensAddress = [
  { name: "sonic", address: "0x446649F0727621BDbB76644B1910be2163b62a11" },
  { name: "anon", address: "0x79bbf4508b1391af3a0f4b30bb5fc4aa9ab0e07c" },
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
