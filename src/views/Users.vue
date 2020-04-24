<template>
  <div class="Users">
    <h1 v-if="currentUser.super_user">Users</h1>
    <h1 v-else>{{currentUser.name}}</h1>
    <div class="container">
      <div class="col-md-12">
        <router-link to="register" tag="a" class="btn btn-primary" v-if="currentUser.super_user">Add user</router-link>
        <router-link id="sendemail" to="sendmail" tag="a" class="btn btn-primary" v-if="currentUser.super_user">
          Send email</router-link>
        <router-link id="changepw" to="changepw" tag="a" class="btn btn-primary">Change password</router-link>
      </div>
      <!-- SUPER USER -->
      <table class="table">
        <tbody>
          <th>Email</th>
          <th>Username</th>
          <th>Superuser</th>
          <th v-if="currentUser.super_user">Delete</th>
        </tbody>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.public_id">
            <td>
              <div v-if="!isEditingEmail(user)">
                {{ user.email }} 
                <a class="btn btn-primary btn-small" v-on:click="onEditEmailClick(user)">Change email</a>
              </div>
              <div v-else>
                <input v-on:change="onNewEmailChange($event, user)" placeholder="New email" :value="editingUsersEmail[user.public_id]" />
                <a class="btn btn-primary btn-small" v-on:click="updateUserEmail(user)">Update</a>
              </div>
            </td>
            <td>{{ user.name }}</td>
            <td v-if="currentUser.super_user">
              <select @change="onSuperUserChange($event, user)">
                <option value="true" :selected="user.super_user == true">Yes</option>
                <option value="false" :selected="user.super_user == false">No</option>
              </select>
            </td>
            <td v-else>{{ user.super_user }}</td>
            <td v-if="currentUser.super_user">
              <button type="button" class="btn btn-danger" @click="delUser($event, user)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
import RestClient from '../utils/rest-client';
import UserAuthentification from '../utils/user-authentification';

export default {
  name: "Users",
  props: [],
  data: function() {
    return {
      users: [],
      newEmail: '',
      currentUser: null,
      editingUsersEmail: {}
    };
  },
  created() {
    if(!UserAuthentification.isAuthenticated()){
      this.$router.push({ path: '/login' });
      return
    }
    this.currentUser = UserAuthentification.getCurrentUser();
    if(UserAuthentification.isCurrentUserSuperUser()){
       RestClient.get("user")
        .then(res => this.users = res.data.users)
        .catch(err => console.log(err));
    } else {
      this.users = [this.currentUser];
    }
  },
  methods: {
    onSuperUserChange: function(event, user){
      console.log(event);
      console.log(user.super_user);
      RestClient.put(`user/${user.public_id}`, { super_user: event.target.value == "true" })
        .then(res => {
          console.log(res);
          user.super_user = event.target.value == "true";
        })
        .catch(err => console.log(err));
    },
    onNewEmailChange: function($event, user) {
      this.editingUsersEmail[user.public_id] = $event.target.value;
    },
    onEditEmailClick: function(user){
      this.editingUsersEmail[user.public_id] = user.email;
      this.$forceUpdate();
    },
    delUser: function(event, user){
      if (!UserAuthentification.isCurrentUserSuperUser()) {
        alert('Vous n\'êtes pas super utilisateur');
        return;
      }

      RestClient.delete(`user/${user.public_id}`)
        .then(res => {
          this.users = this.users.filter((u) => u.public_id !== user.public_id);
          console.log(res)
        })
        .catch(err => console.log(err));
    },
    isEditingEmail: function(user) {
      return Object.keys(this.editingUsersEmail).some((public_id) => public_id === user.public_id);
    },
    updateUserEmail: function(user) {
      RestClient.put(`/user/email/${user.public_id}`, { new_email: this.editingUsersEmail[user.public_id] })
        .then((response) => {
          user.email = this.editingUsersEmail[user.public_id];
          delete this.editingUsersEmail[user.public_id];
          this.$forceUpdate();
        }).catch((error) => console.error(error));
    }
  },
};
</script>

<style scoped>
  .container {
    text-align: left;
  }

  #sendemail{
    margin-left: 5px;
  }
  #changepw{
    margin-left: 5px;
  }
</style>