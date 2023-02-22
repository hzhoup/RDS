import { registerGlobComp } from '/@/components/registerGlobComp'
import '/@/design/index.less'
import { setupGlobDirectives } from '/@/directives'
import { initAppConfigStore } from '/@/logics/initAppConfig'
import { router, setupRouter } from '/@/router'
import { setupRouterGuard } from '/@/router/guard'
import { setupStore } from '/@/store'
// Register icon sprite
import 'virtual:svg-icons-register'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import { createApp } from 'vue'
import App from './App.vue'

import { isDevMode } from './utils/env'

if (isDevMode()) {
  import('ant-design-vue/es/style')
}

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 初始化内部系统配置
  initAppConfigStore()

  // 注册全局组件
  registerGlobComp(app)

  // 配置路由
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

await bootstrap()
