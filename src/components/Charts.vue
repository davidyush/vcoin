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
        const { labels, data } = this.coinHistory;
        const color = data[0] > data[data.length - 1]
          ? { main: "rgba(255, 0, 127, 1)", opacity: "rgba(255, 0, 127, 0.4)" }
          : { main: "rgba(57, 255, 20, 1)", opacity: "rgba(57, 255, 20, 0.4)" };
        this.datacollection = {
        labels: labels,
        datasets:[{
          label: this.coinId.toUpperCase(),
          pointBackgroundColor: color.main,
          borderWidth: 0,
          pointBorderColor: color.main,
          data: data,
          backgroundColor: [
              color.opacity,
            ],
            borderColor: [
              color.main,
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
