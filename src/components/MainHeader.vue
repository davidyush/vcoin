<template>
  <header class="header">
    <ul class="header-list">
      <li>
        <router-link to='/'>Pepele</router-link>
      </li>
      <li>
        <router-link to='/profile'>Profile</router-link>
      </li>
      <li v-if="!userState.name">
        <router-link to='/signin'>Sign In</router-link>
      </li>
      <li v-if="!userState.name">
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
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'MainHeader',
  methods: {
    ...mapMutations(['SEARCH_COINS']),
    search: function(evt) {
      console.log(evt);
    }
  },
  computed: {
    ...mapGetters(['userState'])
  }
}
</script>

<style lang="scss" scoped src='@/styles/header.scss'/>

