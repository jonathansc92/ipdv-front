class TokenService {
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("token"));
      return user;
    }
  
    updateLocalAccessToken(token) {
      this.removeToken();
      this.setToken(token);
    }
  
    getToken() {
      return JSON.parse(localStorage.getItem("token"));
    }
  
    setToken(token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  
    removeToken() {
      localStorage.removeItem("token");
    }
  }
  
  export default new TokenService();
  