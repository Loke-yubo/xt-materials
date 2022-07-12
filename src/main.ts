import '@/core/public-path'
import { render, lifeCycleProvider } from '@/core/lifecycle'
const isQiankun = window.__POWERED_BY_QIANKUN__

if (!isQiankun) {
    window.wm = render()
}

const { bootstrap, mount, unmount } = lifeCycleProvider()
export { bootstrap, mount, unmount }
