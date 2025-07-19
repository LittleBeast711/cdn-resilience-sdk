// 初始化配置

import {initObserver} from './core/observer'
import type { PhoenixConfig } from './utils/type'

let config: PhoenixConfig

export function initPhoenix(useConfig:PhoenixConfig){
  config = useConfig
  initObserver(config)
}