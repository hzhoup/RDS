import { useGlobSetting } from '/@/hooks/setting'

import { REDIRECT_NAME } from '/@/router/constant'
import { useTitle as usePageTitle } from '@vueuse/core'
import { unref, watch } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting()
  const { currentRoute } = useRouter()

  const pageTitle = usePageTitle()

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute)

      if (route.name === REDIRECT_NAME) {
        return
      }

      const tTitle = route?.meta?.title as string
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
    },
    { immediate: true }
  )
}
