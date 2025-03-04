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