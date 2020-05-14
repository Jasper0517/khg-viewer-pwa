<template>
  <el-tabs type="border-card">
    <el-tab-pane :label="$t('home.log.tabs.KHRecord')">
      <KHRecord :kh-data="KHData" />
    </el-tab-pane>
    <el-tab-pane :label="$t('home.log.tabs.messageRecord')">
      <messageRecord :message-data="messageData" />
    </el-tab-pane>
    <el-tab-pane :label="$t('home.log.tabs.originRecord')">
      <originRecord :origin-data="record.originLog" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import KHRecord from './components/KHRecord'
import messageRecord from './components/MessageRecord'
import originRecord from './components/OriginRecord'

import { mapState } from 'vuex'

export default {
  name: 'Log',
  components: { KHRecord, messageRecord, originRecord },
  computed: {
    ...mapState({
      record: state => state.record
    }),
    KHData() {
      return this.record.KHLog.filter(log => log.isKHRecord)
    },
    messageData() {
      return this.record.KHLog.filter(log => !log.isKHRecord)
    }
  }
}
</script>
