/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
}

/** 静态路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  }
]
