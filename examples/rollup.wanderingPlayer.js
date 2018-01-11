import resolve from 'rollup-plugin-node-resolve'
export default {
  input: 'src/wanderingPlayer.js',
  output: { file: 'game.js', format: 'iife' },
  plugins: [resolve({ jsnext: true })],
}
