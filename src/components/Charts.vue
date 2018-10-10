<template>
  <div>
    <charter :chart-data="datacollection" :height='200'/>
    <!-- <div>{{coinHistory}}</div> -->
    <div class='buttons'>
      <button @click="requestHistory({interval: 'h1', coin: coinId, limit: 24})">1 Day</button>
      <button @click="requestHistory({interval: 'h1', coin: coinId, limit: 168})">1 Week</button>
      <button @click="requestHistory({interval: 'm1', coin: coinId, limit: 20})">1 Month</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Charter from './Charter.js'

export default {
  name: 'Charts',
  props: ['coinId'],
  components: {
    Charter
  },
  data() {
    return {
      datacollection: null
    }
  },
  mounted() {
    this.requestHistory({
      interval: 'h1',
      coin: this.coinId,
      limit: 24
    });
  },
  methods: {
    ...mapActions(['getHistory']),
    requestHistory(options) {
      this.getHistory(options).then(() => {
        this.datacollection = {
        labels: this.coinHistory.labels,
        datasets:[{
          label: this.coinId.toUpperCase(),
          pointBackgroundColor: 'rgba(0, 102, 255, 1)',
          borderWidth: 0,
          pointBorderColor: 'white',
          data: this.coinHistory.data,
          backgroundColor: [
              'rgba(0, 102, 255, 0.4)',
            ],
            borderColor: [
              'rgba(0, 102, 255, 1)',
            ],
          }]
        }
      });
    }
  },
  computed: {
    ...mapGetters(['coinHistory'])
  }
}  
</script>