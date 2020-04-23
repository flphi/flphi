import RestClient from '../utils/rest-client';
 
class UserAuthentication {
 
  constructor() {
    this.currentUser = null;
  }
 
  login(username, password) {
    return new Promise((resolve, reject) => {
      RestClient.post('login', { username: username, password: password })
        .then((response) => {
          const token = response.data.token;
          RestClient.setHeader('x-access-token', token);
          console.info('TOKEN RECU DU SERVEUR=' + token);
 
          // Obtient le user authentifié grâce au token
          RestClient.get('current_user').then((response) => {
            this.currentUser = response.data.user;
            //console.log(response.data.user);
            resolve(this.currentUser);
          }).catch((error) => {
            // Server error or invalid x-access-token?? Serait pas supposé
            this.currentUser = null;
            console.info(error);
            reject(error);
          })
        }).catch((error) => {
          // Bad username or password
          console.error(error);
          reject(error);
        });
    });
  }
 
  isAuthenticated() {
    return this.currentUser != null;
  }
 
  isCurrentUserSuperUser() {
    return (this.isAuthenticated() && this.currentUser.super_user);
  }
 
  getCurrentUser() {
    return this.currentUser;
  }
}
 
export default new UserAuthentication();