import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from "../store/index";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/login.vue'),
        meta: {
            name: '登录'
        }
    }, {
        path: '/',
        name: 'container',
        component: () => import('@/pages/container/container.vue'),
        meta: {
            name: '首页'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/pages/home/home.vue'),
                meta: {
                    name: '首页',
                    icon: 'house'
                }
            }, {
                path: '/theme',
                name: 'theme',
                component: () => import('@/pages/theme/theme.vue'),
                meta: {
                    name: '主题管理',
                    icon: 'mostly-cloudy'
                }
            }, {
                path: '/table',
                name: 'table',
                component: () => import('@/pages/table/table.vue'),
                meta: {
                    name: '表格管理',
                    icon: 'tickets'
                }
            }, {
                path: '/router',
                name: 'router',
                component: () => import('@/pages/router/router.vue'),
                meta: {
                    name: '路由管理',
                    icon: 'sort'
                }
            }, {
                path: '/international',
                name: 'international',
                component: () => import('@/pages/international/international.vue'),
                meta: {
                    name: '国际化',
                    icon: 'help'
                }
            }, {
                path: '/micro',
                name: 'micro',
                component: () => import('@/pages/micro/micro.vue'),
                meta: {
                    name: '微前端',
                    icon: 'grid'
                }
            }, {
                path: '/contact',
                name: 'contact',
                component: () => import('@/pages/contact/contact.vue'),
                meta: {
                    name: '联系我们',
                    icon: 'phone'
                }
            }, {
                path: '/map',
                name: 'map',
                component: () => import('@/pages/map/map.vue'),
                meta: {
                    name: '地图',
                    icon: 'map-location'
                }
            }, {
                path: '/editor',
                name: 'editor',
                component: () => import('@/pages/editor/editor.vue'),
                meta: {
                    name: '富文本编辑器',
                    icon: 'reading'
                }
            }, {
                path: '/iframe',
                name: 'iframe',
                component: () => import('@/pages/iframe/iframe.vue'),
                meta: {
                    name: 'iframe通信',
                    icon: 'guide'
                }
            }, {
                path: '/screen',
                name: 'screen',
                component: () => import('@/pages/screen/screen.vue'),
                meta: {
                    name: '大屏展示',
                    icon: 'data-analysis'
                }
            }, {
                path: '/form',
                name: 'form',
                component: () => import('@/pages/form/form.vue'),
                meta: {
                    name: '表单',
                    icon: 'tickets'
                }
            }, {
                path: '/other',
                name: 'other',
                component: () => import('@/pages/other/other.vue'),
                meta: {
                    name: '其他模块',
                    icon: 'link'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export const DynamicRoutes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/home.vue'),
        meta: {
            name: '首页',
            icon: 'house'
        }
    }, {
        path: '/theme',
        name: 'theme',
        component: () => import('@/pages/theme/theme.vue'),
        meta: {
            name: '主题管理',
            icon: 'mostly-cloudy'
        }
    }, {
        path: '/table',
        name: 'table',
        component: () => import('@/pages/table/table.vue'),
        meta: {
            name: '表格管理',
            icon: 'tickets'
        }
    }, {
        path: '/router',
        name: 'router',
        component: () => import('@/pages/router/router.vue'),
        meta: {
            name: '路由管理',
            icon: 'sort'
        }
    }, {
        path: '/international',
        name: 'international',
        component: () => import('@/pages/international/international.vue'),
        meta: {
            name: '国际化',
            icon: 'help'
        }
    }, {
        path: '/micro',
        name: 'micro',
        component: () => import('@/pages/micro/micro.vue'),
        meta: {
            name: '微前端',
            icon: 'grid'
        }
    }, {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/contact/contact.vue'),
        meta: {
            name: '联系我们',
            icon: 'phone'
        }
    }, {
        path: '/map',
        name: 'map',
        component: () => import('@/pages/map/map.vue'),
        meta: {
            name: '地图',
            icon: 'map-location'
        }
    }, {
        path: '/editor',
        name: 'editor',
        component: () => import('@/pages/editor/editor.vue'),
        meta: {
            name: '富文本编辑器',
            icon: 'reading'
        }
    }, {
        path: '/iframe',
        name: 'iframe',
        component: () => import('@/pages/iframe/iframe.vue'),
        meta: {
            name: 'iframe通信',
            icon: 'guide'
        }
    }, {
        path: '/screen',
        name: 'screen',
        component: () => import('@/pages/screen/screen.vue'),
        meta: {
            name: '大屏展示',
            icon: 'data-analysis'
        }
    }, {
        path: '/form',
        name: 'form',
        component: () => import('@/pages/form/form.vue'),
        meta: {
            name: '表单',
            icon: 'tickets'
        }
    }, {
        path: '/other',
        name: 'other',
        component: () => import('@/pages/other/other.vue'),
        meta: {
            name: '其他模块',
            icon: 'link'
        }
    }
]

router.beforeEach((to: any, from: any, next: any) => {
    next();
})

router.afterEach((to: any, from: any, next: any) => {
    try {
        //设置标题
        if (to.meta.name) {
            document.title = to.meta.name;
        }
    } catch (err) { }
    let routerList = to.matched;
    //顶部面包屑
    store.commit("setCrumbList", routerList);
})

export default router;