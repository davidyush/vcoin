<template>
  <div>
    <charter :chart-data="datacollection" :height='200'/>
    <!-- <div>{{coinHistory}}</div> -->
    <div class='buttons'>
      <button
        @click="requestHistory({interval: 'h1', coin: coinId, flag: 'd'})">
        1 Day
      </button>
      <button
        @click="requestHistory({interval: 'h1', coin: coinId, flag: 'w'})">
        1 Week
      </button>
      <button
        @click="requestHistory({interval: 'd1', coin: coinId, flag: 'm'})">
        1 Month
      </button>
      <button
        @click="requestHistory({interval: 'd1', coin: coinId, flag: 'm3'})">
        3 Months
      </button>
      <button
        @click="requestHistory({interval: 'd1', coin: coinId, flag: 'y'})">
        1 Year
      </button>
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
      flag: 'd'
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