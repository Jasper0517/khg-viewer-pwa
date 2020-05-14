<template>
  <section class="system-info">
    <el-card class="system-info-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('home.systemInfo.title') }}</span>
      </div>
      <h4 v-if="formatedData.lastKH === 0 && formatedData.lastTestingTime === 0">{{ $t('home.systemInfo.errorMessage') }}</h4>
      <el-form v-else label-position="left" label-width="130px">
        <el-form-item :label="$t('home.systemInfo.lastKH')">
          <span class="text">{{ formatedData.lastKH }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.lastTestingTime')">
          <span class="text">{{ formatedData.lastTestingTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.nextTestingTime')">
          <span class="text">{{ resetTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('home.systemInfo.intervalTime')">
          <span class="text">{{ formatedData.rountineTime }} {{ $t('home.systemInfo.minutes') }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SystemInfo',
  props: {
    formatedData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    resetTime() {
      return moment().add(this.formatedData.nextTime, 'minutes').format('MM/DD HH:mm:ss')
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
