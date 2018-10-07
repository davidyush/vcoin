<template>
  <header class="header">
    <ul class="header-list">
      <li>
        <router-link to='/'>Pepele</router-link>
      </li>
      <li>
        <router-link to='/profile'>Profile</router-link>
      </li>
      <li>
        <router-link to='/signin'>Sign In</router-link>
      </li>
      <li>
        <router-link to='/login'>Login</router-link>
      </li>
      <li>
        <input
          type="text"
          @input='search'
          class='search-coin'
          placeholder="search"
        />
      </li>
    </ul>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'MainHeader',
  methods: {
    ...mapMutations(['SEARCH_COINS']),
    search: function(evt) {
      console.log(evt);
    }
  }
}
</script>

<style lang="scss" scoped src='@/styles/header.scss'/>

