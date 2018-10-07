<template>
  <button class='more-coins' @click="fetchOffsetCoins">More</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ButtonMore',
  methods: {
    ...mapActions(['fetchOffsetCoins'])
  }
}  
</script>

<style lang="scss" scoped>
.more-coins {
  display: block;
  box-sizing: border-box;
  padding: 12px 15px;
  border: none;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bolder;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  transition: all .25s ease-in-out;
  border-radius: 4px;
  width: 20%;
  margin: 0 auto;
}

.more-coins:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.more-coins:focus {
  outline: none;
}
</style>

