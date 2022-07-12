import Vue from 'vue'

declare global {
    export interface Window {
        /** 是否是微前端应用，类型还真不知道，只看到用来做非空判断 */
        __POWERED_BY_QIANKUN__: boolean;
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
        wm: Vue
    }
}
