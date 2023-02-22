<template>
  <ConfigProvider :locale="zhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { AppProvider } from '/@/components/Application'
  import { useTitle } from '/@/hooks/web/useTitle'
  import { ConfigProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import 'dayjs/locale/zh-cn'

  useTitle()
</script>
