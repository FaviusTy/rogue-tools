import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'src/wanderingPlayer.js',
  output: { file: 'game.js', format: 'iife' },
  plugins: [resolve({ jsnext: true }), commonjs()],
}
