import storeService from "./storeService";

async function get(url, auth = false) {
  const init = {};
  if (auth) {
    init.headers = { authorization: "Bearer " + storeService.getToken() };
  }
  const response = await fetch(url, init);
  if (response.status == 200) {
    const result = await response.json();
    return result;
  }
  return null;
}

async function post(url, data, auth = false) {
  const init = {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (auth) {
    init.headers = {
      ...init.headers,
      authorization: "Bearer " + storeService.getToken(),
    };
  }

  const response = await fetch(url, init);
  if (response.status == 200) {
    const result = await response.json();
    return result;
  }
  return null;
}

export default {
  get,
  post,
};