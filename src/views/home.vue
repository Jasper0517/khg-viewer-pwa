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
      user: state => state.login.user,
      isLoading: state => state.KHG.isLoading
    })
  },
  created() {
    this.getApi()

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
    ...mapActions('KHG', {
      KHGLogin: 'KHGLogin',
      EDAC: 'EDAC',
      GetKHRecord: 'GetKHRecord',
      SetLoading: 'SetLoading'
    }),
    async getApi() {
      this.SetLoading(true)
      const {
        url,
        KHGPassword,
        EDAPKey
      } = this.user
      try {
        await this.KHGLogin({ url, password: KHGPassword })
        await new Promise(resolve => { setTimeout(() => resolve(), 2000) })
        await this.EDAC({ url, EAPK: EDAPKey })
        await new Promise(resolve => { setTimeout(() => resolve(), 2000) })
        await this.GetKHRecord({ url })
      } catch (error) {
        console.error(error)
      } finally {
        this.SetLoading(false)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .logout
    margin-bottom: 20px
</style>
