// 域名重试机制

import {replaceHost} from '../utils/url'
import type { PhoenixConfig } from '../utils/type'
import {reportResult} from './reporter'
import {recordCdnSuccess,getPreferredHost} from '../utils/cdm-cache'

export function retryLoad(
  el:HTMLElement,
  config:PhoenixConfig,
  retryIndex = 0
){
  const url = (el as any).src || (el as any).href
  let nextHost = config.cdnHosts[retryIndex]

  if(retryIndex === 0){
    const cached = getPreferredHost(url,config)
    if(cached) nextHost = cached
  }

  if(!nextHost || retryIndex >= config.maxRetry){
    reportResult({url,status:'fail',retryIndex})
    return
  }

  const newUrl = replaceHost(url,nextHost)
  const clone = el.cloneNode() as HTMLElement

  if(clone instanceof HTMLScriptElement) clone.src = newUrl
  if(clone instanceof HTMLLinkElement) clone.href = newUrl
  if(clone instanceof HTMLImageElement) clone.src = newUrl

  clone.onerror = () => retryLoad(clone,config,retryIndex +1)
  clone.onload = () => {
    reportResult({url:newUrl,status:'success',retryIndex})
    recordCdnSuccess(url,nextHost)
  }

  el.parentNode?.insertBefore(clone,el)
  el.remove()
}