// typings.d.ts or router.ts
import "vue-router"

declare module "vue-router" {
    interface RouteMeta {
        // 是可选的
        isAdmin?: boolean
        // 每个路由都必须声明
        requiresAuth?: boolean
        // role: ['admin','super_editor'] }  //页面需要的权限
        role?: Array<string>
    }
    interface _RouteRecordBase {
        hidden?: boolean
    }
}
