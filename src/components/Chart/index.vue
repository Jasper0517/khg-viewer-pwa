<template>
  <section>
    <el-radio-group v-model="type" size="small">
      <el-radio-button label="today">{{ $t('home.chart.today') }}</el-radio-button>
      <el-radio-button label="yesterday">{{ $t('home.chart.yesterday') }}</el-radio-button>
      <el-radio-button label="week">{{ $t('home.chart.thisWeek') }}</el-radio-button>
      <el-radio-button label="lastWeek">{{ $t('home.chart.lastWeek') }}</el-radio-button>
      <el-radio-button label="month">{{ $t('home.chart.thisMonth') }}</el-radio-button>
      <el-radio-button label="lastMonth">{{ $t('home.chart.lastMonth') }}</el-radio-button>
    </el-radio-group>
    <el-switch
      v-model="extend.series.label.normal.show"
      class="switch"
      :inactive-text="$t('home.chart.isOpenNumber')"
    />
    <VeLine
      :data="chartData"
      :settings="chartSettings"
      :extend="extend"
      :colors="colors"
    />
  </section>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'

import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Chart',
  components: { VeLine },
  data() {
    return {
      type: 'today',
      chartSettings: {
        min: [6],
        max: [10]
        // area: true,
      },
      extend: {
        series: {
          label: {
            normal: {
              show: false
            }
          }
        }
      },
      colors: ['#4560d8']
    }
  },
  computed: {
    ...mapState({
      KHLog: state => state.KHG.record.KHLog
    }),
    KHData() {
      return this.KHLog.filter(log => log.isKHRecord)
    },
    todayKHLog() {
      return this.KHData.filter(item => item.date === moment().format('MM/DD'))
    },
    yesterdayKHLog() {
      return this.KHData.filter(item => item.date === moment().subtract(1, 'day').format('MM/DD'))
    },
    weekKHLog() {
      const weekDate = []
      for (let i = 0; i < 7; i++) {
        weekDate.push(moment().day(i).format('MM/DD'))
      }
      return this.KHData.filter(item => weekDate.indexOf(item.date) > -1)
    },
    lastWeekKHLog() {
      const weekDate = []
      for (let i = -1; i > -8; i--) {
        weekDate.push(moment().day(i).format('MM/DD'))
      }
      return this.KHData.filter(item => weekDate.indexOf(item.date) > -1)
    },
    monthKHLog() {
      return this.KHData.filter(item => item.date.indexOf(moment().format('MM/')) > -1)
    },
    lastMonthKHLog() {
      return this.KHData.filter(item => item.date.indexOf(moment().subtract(1, 'months').format('MM/')) > -1)
    },
    currentLog() {
      return [...this[`${this.type}KHLog`]].reverse()
    },
    chartData() {
      switch (this.type) {
        case 'today':
          return {
            columns: ['時間', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '時間': `${item.time.trim()}`,
                'KH': item.KH
              }
            })
          }
        case 'yesterday':
          return {
            columns: ['時間', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '時間': `${item.time.trim()}`,
                'KH': item.KH
              }
            })
          }
        case 'week':
          return {
            columns: ['日期', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '日期': `${item.date.trim()}\n${item.time}`,
                'KH': item.KH
              }
            })
          }
        case 'lastWeek':
          return {
            columns: ['日期', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '日期': `${item.date.trim()}\n${item.time}`,
                'KH': item.KH
              }
            })
          }
        case 'month':
          return {
            columns: ['日期', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '日期': `${item.date.trim()}\n${item.time}`,
                'KH': item.KH
              }
            })
          }
        case 'lastMonth':
          return {
            columns: ['日期', 'KH'],
            rows: this.currentLog.map(item => {
              return {
                '日期': `${item.date.trim()}\n${item.time}`,
                'KH': item.KH
              }
            })
          }
        default:
          return {}
      }
    }
  },
  methods: {
    filterKHLog() {
    }
  }
}
</script>

<style lang="sass">
  .switch
    display: block!important
    margin: 20px 0
</style>
