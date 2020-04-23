<template>
  <div class="Users">
    <h1 v-if="currentUser.super_user">Users</h1>
    <h1 v-else>{{currentUser.name}}</h1>
    <div class="container">
      <div class="col-md-12">
        <router-link to="register" tag="a" class="btn btn-primary" v-if="currentUser.super_user">Add user</router-link>
        <router-link to="changemail" tag="a" class="btn btn-primary" v-else>Change email</router-link>
        <router-link id="sendemail" to="sendmail" tag="a" class="btn btn-primary" v-if="currentUser.super_user">Send email</router-link>
        <router-link id="changepw" to="changepw" tag="a" class="btn btn-primary" v-else>Change password</router-link>
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
            <td>{{ user.email }}</td>
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
      currentUser: null,
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
    delUser: function(event, user){
      if (!UserAuthentification.isCurrentUserSuperUser()) {
        alert('Vous n\'êtes pas super utilisateur');
        return;
      }

      RestClient.delete(`user/${user.public_id}`)
        .then(res => {
          this.users = this.users.filter((u) => u.public_id !== user.public_id);
        })
        .catch(err => console.log(err));
    }
  }
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