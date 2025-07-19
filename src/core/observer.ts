// 资源异常监听器
import {retryLoad} from './retry'
import type { PhoenixConfig } from '../utils/type'

export function initObserver(config:PhoenixConfig){
  window.addEventListener('error',(e:ErrorEvent)=>{
    const target = e.target as HTMLElement
    const tag = target.tagName?.toLowerCase()

    if(['script','link','img'].includes(tag)){
      retryLoad(target,config)
    }
  },true)

  // 白屏兜底保护，设置查实检测dom内容是否加载失败
  setTimeout(()=>{
    const hasContent = document.body?.innerText?.trim()
    if(!hasContent){
      const fallback = document.createElement('div')
      fallback.innerHTML = '<h2>资源加载失败，请稍后刷新页面。</h2>'
      fallback.style.cssText = 'color:red;text-align:center;padding-top:20vh;font-size:18px;'
      document.body.innerHTML = ''
      document.body.appendChild(fallback)
    }
  },config.fallbackTimeout || 8000)
}