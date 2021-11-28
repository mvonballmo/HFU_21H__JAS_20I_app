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

export function getAddresses() {
  return execute("http://localhost:3001/addresses");
}

export function getAddress(id) {
  return execute(`http://localhost:3001/addresses/${id}`);
}

export function insertAddress(address) {
  return insertOrUpdate(`http://localhost:3001/addresses/`, address, "POST");
}

export function updateAddress(address) {
  return insertOrUpdate(`http://localhost:3001/addresses/${address.id}`, address, "PUT");
}

export function deleteAddress(address) {
  return fetch(`http://localhost:3001/addresses/${address.id}`, { method: "DELETE" });
}

export function getCars() {
  return execute("http://localhost:3001/cars");
}
