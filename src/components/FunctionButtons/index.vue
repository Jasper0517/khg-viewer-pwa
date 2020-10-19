<template>
  <section class="function-buttons">
    <el-button type="info" @click="dialogVisible = !dialogVisible">{{ $t('home.functionButtons.openFunctionButtons') }}</el-button>
    <el-dialog
      :title="$t('home.functionButtons.title')"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-button @click="getKH">
        {{ $t('home.functionButtons.buttons.getdKH') }}
      </el-button>
      <!-- <el-button @click="controlEngMode">
        開啟工程模式
      </el-button> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogVisible = false">{{ $t('home.functionButtons.exit') }}</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import qs from 'qs'
import cheerio from 'cheerio'

export default {
  name: 'FunctionButtons',
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      tempData: state => state.KHG.tempData,
      user: state => state.login.user
    })
  },
  methods: {
    ...mapActions('KHG', {
      NormalApiControl: 'NormalApiControl'
    }),
    async controlEngMode() {
      const engData = qs.stringify({ 'ACT_NAME': 'ENG Mode ON' })
      await this.NormalApiControl(engData).then(() => {
        this.$message({
          showClose: true,
          message: this.$t('home.functionButtons.tips.getdKH.success'),
          type: 'success'
        })
      }).catch(() => {
        this.$message.error(this.$t('home.functionButtons.tips.getdKH.error'))
      }).finally(() => {
        this.dialogVisible = false
      })
      const $ = cheerio.load(this.tempData)
      const body = $('body')
      const inputs = body.eq(0).find('input[value=\'ENG Mode ON\']')
      console.log(inputs.attr('style'))
    },
    getKH() {
      const data = {
        url: this.user.url,
        actName: 'Get dKH'
      }
      this.NormalApiControl(data).then(() => {
        this.$message({
          showClose: true,
          message: this.$t('home.functionButtons.tips.getdKH.success'),
          type: 'success'
        })
      }).catch(() => {
        this.$message.error(this.$t('home.functionButtons.tips.getdKH.error'))
      }).finally(() => {
        this.dialogVisible = false
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .function-buttons
    margin-bottom: 20px
</style>
