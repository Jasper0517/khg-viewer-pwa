<template>
  <section class="home">
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
      },
      isGetData: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.login.user,
      isLoading: state => state.KHG.isLoading
    })
  },
  created() {
    if (!this.isGetData) {
      if (process.env.NODE_ENV === 'production') this.getApi()
      this.isGetData = true
    }
  },
  methods: {
    ...mapActions('KHG', {
      KHGLogin: 'KHGLogin',
      EDAC: 'EDAC',
      GetKHRecord: 'GetKHRecord',
      SetLoading: 'SetLoading'
    }),
    ...mapActions('app', {
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
