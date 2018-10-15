<template>
  <div class='container'>
    <aside class='left-side'>
      <h1>{{userState.name}}</h1>
      <h2>${{userState.money}}</h2>
    </aside>
    <div class='right-side'>
      <p>{{ userState }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['userState'])
  }
} 
</script>

<style scoped src='@/styles/profile.scss'/>
