<template>
  <div>
    <charter :chart-data="datacollection" :height='200' :options="oops"/>
    <!-- <div>{{coinHistory}}</div> -->
    <div class='buttons'>
      <button
        class='btn'
        @click="requestHistory({interval: 'h1', coin: coinId, flag: 'd'})">
        1 Day
      </button>
      <button
        class='btn'
        @click="requestHistory({interval: 'h1', coin: coinId, flag: 'w'})">
        1 Week
      </button>
      <button
        class='btn'
        @click="requestHistory({interval: 'd1', coin: coinId, flag: 'm'})">
        30 Days
      </button>
      <button
        class='btn'
        @click="requestHistory({interval: 'd1', coin: coinId, flag: 'm3'})">
        90 Days
      </button>
      <button
        class='btn'
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
      datacollection: null,
      oops: {
        ticks: {
                fontSize: 15,
                beginAtZero: true,
                stepSize: 1
            },
        legend: {
          display: false
        },
        scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: true
            }
        }]
    }
      }
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
          pointBorderColor: 'rgba(0, 102, 255, 1)',
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

<style lang="scss" scoped src='@/styles/charts.scss'/>
