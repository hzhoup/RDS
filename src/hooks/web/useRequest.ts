import { TOKEN_KEY } from '/@/enums/cacheEnum'
import { useMessage } from '/@/hooks/web/useMessage'
import { router } from '/@/router'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { createFetch, isObject, MaybeRef, UseFetchReturn } from '@vueuse/core'
import { computed, unref } from 'vue'
import { LocationQueryRaw, stringifyQuery } from 'vue-router'

const { createMessage } = useMessage()
const baseUrl = import.meta.env.VITE_GLOB_API_URL

const useRequest = createFetch({
  baseUrl,
  options: {
    immediate: false,
    timeout: 10 * 1000,
    beforeFetch({ options }) {
      options.headers = Object.assign(options.headers || {}, {
        'app-token': getAuthCache(TOKEN_KEY)
      })

      return { options }
    },
    afterFetch({ data, response }) {
      const status = data.errorCode

      if (!status) {
        data = data.data || {}
      } else if (status === '401') {
        setAuthCache(TOKEN_KEY, undefined)
        createMessage.warning(data.errorMessage || '登陆已经过期')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
        data = null
      } else {
        createMessage.warning(data.errorMessage || '网络请求错误,请联系管理员!')
        data = null
      }

      import.meta.env.MODE === 'development' && console.log('result:', data)

      return { data, response }
    },
    onFetchError({ data, error }) {
      console.error(error)
      data = undefined
      return { data, error }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useGet<T = unknown>(
  url: MaybeRef<string>,
  query?: MaybeRef<unknown>
): UseFetchReturn<T> {
  const _url = computed(() => {
    const _url = unref(url)
    const _query = unref(query)
    const queryString = isObject(_query) ? stringifyQuery(_query as LocationQueryRaw) : _query || ''
    return `${_url}${queryString ? '?' : ''}${queryString}`
  })

  return useRequest<T>(_url).json()
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePost<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).post(payload).json()
}

/**
 * 封装 put 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePut<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).put(payload).json()
}

/**
 * 封装 delete 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function useDelete<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).delete(payload).json()
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */
export function useBlob(url: MaybeRef<string>): UseFetchReturn<Blob> {
  return useRequest(url).blob()
}
