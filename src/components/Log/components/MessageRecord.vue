<template>
  <div class="home">
    <el-table
      :data="messageData"
      stripe
      border
      style="width: 100%"
      height="500"
    >
      <el-table-column
        prop="date"
        :label="$t('home.log.messageRecord.date')"
        width="58"
      />
      <el-table-column
        prop="time"
        :label="$t('home.log.messageRecord.time')"
        width="76"
      />
      <el-table-column
        prop="message"
        :label="$t('home.log.messageRecord.message')"
      />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'MessageRecord',
  props: {
    messageData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
