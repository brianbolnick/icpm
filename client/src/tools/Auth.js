import jwtDecode from 'jwt-decode';

class Auth {


  static authenticateUser(token) {
    localStorage.setItem('token', token);
    const user_info = jwtDecode(token);
  
    localStorage.setItem('user', JSON.stringify(user_info));
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }


  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUser() {
    return localStorage.getItem('user');
  }

}

export default Auth;