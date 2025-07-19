import {defineConfig} from 'vite'
import {resolve} from 'path'

export  default defineConfig({
  build:{
    lib:{
      entry:resolve(__dirname,'src/index.ts'),
      name:'myPhoenixSDK',
      fileName:'my-phoennix-sdk',
      formats:['umd','es']
    },
    outDir:'dist',
    rollupOptions:{
      output:{
        exports:'named'
      }
    }
  }
})