// 结果上报
// import type { PhoenixConfig } from '../utils/type'
interface ReportData{
  url:string
  status: 'success' | 'fail'
  retryIndex:number
}

export function reportResult(data:ReportData){
  const reportUrl = window.__phoenix_config?.reportUrl ||'/radar=seed/report'
  navigator.sendBeacon(reportUrl,JSON.stringify(data))
}