<template>
  <div class="Register">
    <h1>Register</h1>

    <div class="container">
      <div class="alert alert-danger" role="alert" v-if="invalid">
        All fields are required
      </div>
      <div class="alert alert-danger" role="alert" v-if="serverError">
        Server error
      </div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" v-model="email"/>
            </div>
          </div>

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
            <input type="submit" class="btn btn-primary" v-on:click="onRegisterClick($event)">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import RestClient from '../utils/rest-client';
import UserAuthentification from '../utils/user-authentification';

export default {
  name: "Register",
  props: [],
  data: function() {
    return {
      email: '',
      username: '',
      password: '',
      invalid: false,
      serverError: false
    };
  },
  created() {
    if(!UserAuthentification.isCurrentUserSuperUser()){
      this.$router.push({ path: '/login' });
      return
    }
  },
  methods: {
    onRegisterClick: function(event) {
      if (!this.email.length || !this.username.length || !this.password.length) {
        this.invalid = true;
        return;
      } else {
        this.invalid = false
      }
      RestClient.post('user', { email: this.email, username: this.username, password: this.password})
        .then((response) => {
          this.serverError = false;
          this.$router.push({ path: '/users' });
        }).catch((error) => {
          this.serverError = true;
        });
      event.preventDefault();
    }
  }
}
</script>

<style scoped>
  .container {
    text-align: left;
  }
</style>