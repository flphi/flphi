<template>
  <div class="SendMail">
    <h1>Change password</h1>

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
              <label for="new_pw">New password</label>
              <input type="text" class="form-control" v-model="new_pw"/>
            </div>
          </div>

          <div class="col-md-12">
            <input type="submit" class="btn btn-primary" v-on:click="onChangeClick($event)">
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
  name: "Changepw",
  props: [],
  data: function() {
    return {
      new_pw: '',
      currentUser: null,
      invalid: false,
      serverError: false
    };
  },
  created() {
      this.currentUser = UserAuthentification.getCurrentUser();
  },
  methods: {
    onChangeClick: function(event) {
      if (!this.new_pw.length) {
        this.invalid = true;
        return;
      } else {
        this.invalid = false
      }
      RestClient.put(`/user/pw/${this.currentUser.public_id}`, { new_pw : this.new_pw})
        .then((response) => {
          this.serverError = false;
          alert('Password changed.')
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