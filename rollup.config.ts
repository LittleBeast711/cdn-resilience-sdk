import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input:'src/index.ts',
  output:[
    {
      file:'dist/phoenix-sdk.umd.js',
      format:'umd',
      name:'myPhoenixSDK'
    },
    {
      file:'dist/phoenix-sdk.esm.js',
      format:'es'
    }
  ],
  plugins:[resolve(),commonjs()]
}