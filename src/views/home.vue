<template>
  <section
    v-loading.fullscreen.lock="isLoading"
    class="home"
    :element-loading-text="$t('loading')"
  >
    <SystemInfo :formated-data="formatedEDAC" />
    <FunctionButtons />
    <Chart />
    <Log />
  </section>
</template>

<script>
import Log from '@/components/Log'
import Chart from '@/components/Chart'
import SystemInfo from '@/components/SystemInfo'
import FunctionButtons from '@/components/FunctionButtons'

import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    Log,
    Chart,
    SystemInfo,
    FunctionButtons
  },

  data() {
    return {
      formatedEDAC: {
        lastKH: 0,
        lastTestingTime: 0,
        resetTime: 0,
        port: 0,
        rountineTime: 0,
        nextTime: 0
      }
    }
  },
  computed: {
    ...mapState({
      record: state => state.record,
      isLoading: state => state.isLoading,
      setting: state => state.setting
    })
  },
  created() {
    // const password = Cookies.get('password')
    // const EDAP = Cookies.get('EDAP')
    // const url = Cookies.get('url')

    // this.SetPassword(password)
    // this.SetUrl(url)
    // this.SetEDAP(EDAP)

    // if (!this.setting.password || !this.setting.url) {
    //   this.$router.push('/setting')
    //   return
    // }

    // this.SetLoading(true)

    // const loginData = qs.stringify({ password: this.setting.password, button: 'Login' })
    // this.Login(loginData).then(async() => {
    //   await new Promise(resolve => { setTimeout(() => resolve(), 4000) })
    //   const EDACData = qs.stringify({ EAPK: this.setting.EDAP })
    //   await this.GetEDAC(EDACData)
    //   this.EDACPaser()
    //   await new Promise(resolve => { setTimeout(() => resolve(), 4000) })
    //   await this.GetKHRecord()
    //   this.logParser()
    //   this.SetLoading(false)
    // }).catch(
    //   error => {
    //     this.SetLoading(false)
    //     throw error
    //   }
    // )
  },
  methods: {
    ...mapActions({
      Login: 'Login',
      GetEDAC: 'EDAC',
      GetKHRecord: 'GetKHRecord',
      SetKHLog: 'SetKHLog',
      SetLoading: 'SetLoading',
      SetPassword: 'SetPassword',
      SetUrl: 'SetUrl',
      SetEDAP: 'SetEDAP'
    }),
    logParser() {
      // 上個月第一天
      const starts = moment().startOf('month').subtract('month', 1)
      // 這個月+上個月總天數
      const totalDays = moment(moment().month() - 1).daysInMonth() + moment().daysInMonth()
      // filter以上條件外的資料
      const copyOriginLog = JSON.parse(JSON.stringify(this.record.originLog))
      const filterOriginLog = []
      for (let i = 0; i < copyOriginLog.length; i++) {
        // 每筆log date
        const date = moment(moment().format('YYYY/') + copyOriginLog[i].item.replace(/\r\n|\n/g, '').substring(1, 6))
        // 相差上個月幾天
        const diffDate = date.diff(starts, 'days')
        // 如果找完上個月份的就終止
        if (totalDays < diffDate) break
        filterOriginLog.push(copyOriginLog[i])
      }
      const originData = filterOriginLog.length > 800 ? filterOriginLog.splice(0, 800) : filterOriginLog
      const formatedData = originData.map(({ item }) => {
        const havePH = item.indexOf('pH:') >= 0
        const newData = item.replace(' AK. ', ' ').replace(' AK.', ' ').split(' ')
        const obj = {}
        obj.date = newData[0].replace(/\r\n|\n/g, '').trim()
        obj.time = newData[1]
        if (newData[2].indexOf('W') === 0) {
          obj.KH = +newData[havePH ? 9 : 6].replace(':', '')
          obj.isKHRecord = true
          obj.distance = +newData[2].replace('W.', '')
          obj.AK = +newData[4]
          obj.error = newData[3]
        } else {
          const message = newData.splice(2).join(' ')
          if (message.indexOf('ERR') >= 0) {
            obj.isError = true
          }
          obj.isKHRecord = false
          obj.message = message
        }
        return obj
      })
      this.SetKHLog(formatedData)
    },
    EDACPaser() {
      if (!this.record.EDAC) return
      const data = this.record.EDAC.replace(/</g, '').replace(/>/g, ',').replace(/\n/g, '').split(',')
      this.formatedEDAC.rountineTime = +data[1].trim()
      this.formatedEDAC.resetTime = +data[14].trim()
      this.formatedEDAC.port = +data[12].trim()
      this.formatedEDAC.lastKH = +data[5].trim()
      this.formatedEDAC.lastTestingTime = data[15].trim()
      this.formatedEDAC.nextTime = +data[14].trim()
    }
  }
}
</script>

<style lang="sass" scoped>
  .logout
    margin-bottom: 20px
</style>
