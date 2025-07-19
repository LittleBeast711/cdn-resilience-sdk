export interface PhoenixConfig{
  cdnHosts:string[]
  maxRetry:number
  resourceTypes?:Array<'script' | 'link' | 'img'>
  reportUrl?:string
  fallbackTimeout?:number
}

declare global{
  interface Window {
    __phoenix_config?:PhoenixConfig
  }
}