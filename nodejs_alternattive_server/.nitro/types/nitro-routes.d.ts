
import type { Serialize, Simplify } from "nitropack/types";

declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/auth/codes': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/auth/codes').default>>>>
    }
    '/api/auth/login': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/auth/login.post').default>>>>
    }
    '/api/auth/logout': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/auth/logout.post').default>>>>
    }
    '/api/auth/refresh': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/auth/refresh.post').default>>>>
    }
    '/api/status': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/status').default>>>>
    }
    '/api/system/dept/': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/system/dept/.post').default>>>>
    }
    '/api/system/dept/:id': {
      'delete': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/system/dept/[id].delete').default>>>>
      'put': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/system/dept/[id].put').default>>>>
    }
    '/api/system/dept/list': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/system/dept/list').default>>>>
    }
    '/api/timezone/getTimezone': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/timezone/getTimezone').default>>>>
    }
    '/api/timezone/getTimezoneOptions': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/timezone/getTimezoneOptions').default>>>>
    }
    '/api/timezone/setTimezone': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/timezone/setTimezone').default>>>>
    }
    '/api/upload': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/upload').default>>>>
    }
    '/api/user/info': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../api/user/info').default>>>>
    }
    '/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../routes/[...]').default>>>>
    }
  }
}

export {}
