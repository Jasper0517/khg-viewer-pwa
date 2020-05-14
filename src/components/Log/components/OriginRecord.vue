<template>
  <div class="origin-record">
    <el-button round type="warning" class="create-image-button" @click="generatorImage">
      {{ $t('home.log.originRecord.createImage') }}
    </el-button>
    <el-table
      ref="originTable"
      :data="originData"
      stripe
      border
      class="origin-table"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="item"
        :label="$t('home.log.originRecord.data')"
      />
    </el-table>
    <div ref="show" />
  </div>
</template>

<script>

import domtoimage from 'dom-to-image'

export default {
  name: 'OriginData',
  props: {
    originData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    generatorImage() {
      domtoimage.toPng(this.$refs.originTable.$el, { quality: 0.95 })
        .then((dataUrl) => {
          var link = document.createElement('a')
          link.href = dataUrl
          link.target = '_blank'
          link.click()
        })
    },
    tableRowClassName({ row, rowIndex }) {
      const item = row.item
      if (item.indexOf('ERR') >= 0) {
        return 'error-message'
      } else if (item.indexOf('ERR') < 0 && item.indexOf('KH :') < 0) {
        return 'system-message'
      }
      return ''
    }
  }
}
</script>

<style lang="sass">
  .origin-record
    .create-image-button
      margin-bottom: 20px
    .el-table__row
      &.error-message
        td
          background: oldlace!important
      &.system-message
        td
          background: #f0f9eb!important
</style>
