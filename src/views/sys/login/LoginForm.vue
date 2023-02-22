<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left enter-x">
    登录
  </h2>
  <Form
    v-show="getShow"
    ref="formRef"
    :model="formData"
    :rules="getFormRules"
    class="p-4 enter-x"
    @keypress.enter="handleLogin"
  >
    <FormItem class="enter-x" name="account">
      <Input
        v-model:value="formData.account"
        class="fix-auto-fill"
        placeholder="账号"
        size="large"
      />
    </FormItem>
    <FormItem class="enter-x" name="password">
      <InputPassword
        v-model:value="formData.password"
        placeholder="密码"
        size="large"
        visibilityToggle
      />
    </FormItem>

    <FormItem class="enter-x">
      <Button :loading="loading" block size="large" type="primary" @click="handleLogin">
        登录
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign'

  import { useMessage } from '/@/hooks/web/useMessage'

  import { useUserStore } from '/@/store/modules/user'

  import { Button, Form, Input } from 'ant-design-vue'
  import { computed, reactive, ref, unref } from 'vue'
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin'

  const FormItem = Form.Item
  const InputPassword = Input.Password
  const { notification, createErrorModal } = useMessage()
  const { prefixCls } = useDesign('login')
  const userStore = useUserStore()

  const { getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    account: '',
    password: ''
  })

  const { validForm } = useFormValid(formRef)

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none' //不要默认的错误提示
      })
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `'欢迎回来': ${userInfo.realName}`,
          duration: 3
        })
      }
    } catch (error) {
      createErrorModal({
        title: '错误提示',
        content: (error as unknown as Error).message || '网络异常，请检查您的网络连接是否正常!',
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body
      })
    } finally {
      loading.value = false
    }
  }
</script>
