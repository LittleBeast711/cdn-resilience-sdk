import type { PhoenixConfig } from './type';

const CACHE_KEY = '__phoenix_cdn_cache__'

export function recordCdnSuccess(url:string,host:string){
  const key = extractPath(url)
  const data = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
  data[key] = {host,ts:Date.now()}
  localStorage.setItem(CACHE_KEY,JSON.stringify(data))
}

export function getPreferredHost(url:string,config:PhoenixConfig):string | null {
  const key = extractPath(url)
  const data = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  const record = data[key]
  if(record && config.cdnHosts.includes(record.host)) return record.host
  return null
}

export function extractPath(url:string){
  try{
    const u = new URL(url)
    return u.pathname
  } catch {
    return url
  }
}