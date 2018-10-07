<template>
  <div class="home-page">
    <coins-table/>
    <button-more/>
  </div>
</template>

<script>
import CoinsTable from '@/components/CoinsTable'
import ButtonMore from '@/components/ButtonMore'

export default {
  name: 'Home',
  components: {
    CoinsTable,
    ButtonMore
  }
}
</script>
