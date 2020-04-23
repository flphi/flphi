<template>
  <div class="Login">
    <h1>Login</h1>

    <div class="container">
      <div class="alert alert-danger" role="alert" v-if="invalid">
        Invalid username or password
      </div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-model="username"/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
          </div>

          <div class="col-md-12">
            <input type="submit" class="btn btn-primary" v-on:click="onLoginClick($event)">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserAuthentification from '../utils/user-authentification';

export default {
  name: "Login",
  props: [],
  data: function() {
    return {
      username: '',
      password: '',
      invalid: false,
    };
  },
  methods: {
    onLoginClick: function(event) {
      if (!this.username.length || !this.password.length) {
        this.invalid = true;
        return;
      } else {
        this.invalid = false
      }
      UserAuthentification.login(this.username, this.password)
        .then((response) => {
          this.invalid = false;
          console.log(response);
          this.$router.push({ path: '/users' });
        }).catch((error) => {
          this.invalid = true;
          console.log(error);
        });
      event.preventDefault();
    }
  }
};
</script>

<style scoped>
.container {
  text-align: left;
}
</style>