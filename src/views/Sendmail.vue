<template>
  <div class="SendMail">
    <h1>Send Mail to Users</h1>

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
              <label for="title">Title</label>
              <input type="text" class="form-control" v-model="title"/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="content">Content</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
            </div>
          </div>

          <div class="col-md-12">
            <input type="submit" class="btn btn-primary" v-on:click="onSendClick($event)">
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
  name: "Sendmail",
  props: [],
  data: function() {
    return {
      title: '',
      content: '',
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
    onSendClick: function(event) {
      if (!this.title.length || !this.content.length) {
        this.invalid = true;
        return;
      } else {
        this.invalid = false
      }
      RestClient.post('/send/mail', { title: this.title, content: this.content})
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