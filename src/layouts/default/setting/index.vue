<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts">
  import { useDrawer } from '/@/components/Drawer'
  import Icon from '/@/components/Icon/src/Icon.vue'
  import { defineComponent } from 'vue'
  import SettingDrawer from './SettingDrawer'

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, Icon },
    setup() {
      const [register, { openDrawer }] = useDrawer()

      return {
        register,
        openDrawer
      }
    }
  })
</script>
