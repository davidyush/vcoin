<template>
  <div>
    <div class="info">
      <h3>#{{info.rank}} {{info.symbol}} {{info.id}}</h3>
      <p>Current price ${{ Number(info.priceUsd).toFixed(5)}}</p>
      <p>Change for last 24 hours {{Number(info.changePercent24Hr).toFixed(2)}}%</p>
      <p>Market Cap ${{Number(info.marketCapUsd).toFixed(2)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleCoinInfo',
  props: ['info']
}
</script>

<style lang="scss" scoped src='@/styles/single_coin.scss'/>

