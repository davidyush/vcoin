<template>
  <div class='form-container'>
    <h1>Sign in</h1>
    <form @submit.prevent="submit">
      <input autocomplete="cc-name" type="text" v-model="name" placeholder='name'>
      <input autocomplete="email" type="email" v-model="email" placeholder='email'>
      <input autocomplete type="password" v-model="password" placeholder='Password'>
      <input class='btn-submit' type='submit' value='submit'/>
    </form>
    <p v-for="err in userErrors" :key="err">{{err}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      name: 'goodboy',
      email: 'asd@asd.com',
      password: '123123'
    }
  },
  methods: {
    ...mapActions(['signIn']),
    submit: function() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.signIn(user);
    }

  },
  computed: {
    ...mapGetters(['userState', 'userErrors'])
  }
}
</script>

<style scoped src='@/styles/sign_in.scss'/>
