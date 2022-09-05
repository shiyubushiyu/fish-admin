/** 权限路由相关类型 */
declare namespace AuthRoute {
  /** 多级路由分割符号 */
  type RouteSplitMark = '_'

  /** 路由的key */
  type RouteKey = 'root' | 'login'

  /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
  interface Route {
    /** 路由名称(路由唯一标识) */
    name: RouteKey
    /** 路由路径 */
    path: RoutePath
    /** 路由重定向 */
    redirect?: RoutePath
    /**
     * 路由组件
     * - basic: 基础布局，具有公共部分的布局
     * - blank: 空白布局
     * - multi: 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
     * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
     */
    component?: RouteComponent
    /** 子路由 */
    children?: Route[]
    /** 路由描述 */
    meta: RouteMeta
    /** 路由属性 */
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
  }
}
