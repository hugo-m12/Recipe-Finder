function storeToken(token) {
    sessionStorage.setItem("token", token);
  }
  
  function getToken() {
    return sessionStorage.getItem("token");
  }
  
  function deleteToken() {
    return sessionStorage.removeItem("token");
  }
  
  export default {
    storeToken,
    getToken,
    deleteToken,
  };