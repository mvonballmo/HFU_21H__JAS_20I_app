async function execute(url, init = undefined) {
  const response = await fetch(url, init);

  return response.json();
}

function insertOrUpdate(url, address, method) {
  return execute(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
}

export function getAddressesUrl() {
  return "http://localhost:3001/addresses";
}

export function getAddresses() {
  return execute(getAddressesUrl());
}

export function getAddress(id) {
  return execute(`${getAddressesUrl()}/${id}`);
}

export function insertAddress(address) {
  return insertOrUpdate(`${getAddressesUrl()}/`, address, "POST");
}

export function updateAddress(address) {
  return insertOrUpdate(`${getAddressesUrl()}/${address.id}`, address, "PUT");
}

export function deleteAddress(address) {
  return fetch(`${getAddressesUrl()}/${address.id}`, { method: "DELETE" });
}

export function getCars() {
  return execute("http://localhost:3001/cars");
}
