<template>
  <section class="system-info">
    <span class="version">{{ `${$t('header.version')}${version}` }}</span>
    <el-card class="system-info-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('home.systemInfo.title') }}</span>
      </div>
      <h4 v-if="formateData.lastKH === 0 && formateData.lastTestingTime === 0">{{ $t('home.systemInfo.errorMessage') }}</h4>
      <el-form v-else label-position="left" label-width="130px">
        <el-form-item :label="$t('home.systemInfo.lastKH')">
          <span class="text">{{ formateData.lastKH }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.lastTestingTime')">
          <span class="text">{{ formateData.lastTestingTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.nextTestingTime')">
          <span class="text">{{ resetTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.intervalTime')">
          <span class="text">{{ formateData.rountineTime }} {{ $t('home.systemInfo.minutes') }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'SystemInfo',
  computed: {
    ...mapState({
      formateData: state => state.KHG.record.EDAC
    }),
    resetTime() {
      return dayjs().add(this.formateData.nextTime, 'minutes').format('MM/DD HH:mm:ss')
    },
    version() {
      return require('../../../package.json').version
    }
  }
}
</script>

<style lang="sass" scoped>
  .system-info
    margin-bottom: 20px
    .text
      display: block
      text-align: left
    .system-info-card
      width: 100%
      max-width: 500px
      margin: 0 auto
      .el-form-item
        margin: 0
</style>
