<template>
  <div class="home">
    <el-table
      :data="khData"
      stripe
      border
      style="width: 100%"
      height="500"
    >
      <el-table-column
        prop="date"
        :label="$t('home.log.KHRecord.date')"
        min-width="58"
      />
      <el-table-column
        prop="time"
        :label="$t('home.log.KHRecord.time')"
        min-width="76"
      />
      <el-table-column
        prop="KH"
        label="KH"
        min-width="50"
      />
      <el-table-column
        prop="AK"
        :label="$t('home.log.KHRecord.dosing')"
        min-width="40"
      />
      <el-table-column
        prop="distance"
        :label="$t('home.log.KHRecord.distance')"
        min-width="50"
      />
      <el-table-column
        prop="error"
        :label="$t('home.log.KHRecord.deviation')"
        min-width="50"
      />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'KHRecord',
  props: {
    khData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
