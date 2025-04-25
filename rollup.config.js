import commonjs from '@rollup/plugin-commonjs';

export default {
  input: '?.js',
  output: {
    format: 'esm', // 必须指定为 ES 模块
    file: '?.js'
  },
  plugins: [commonjs()], // 必须包含 commonjs 插件
};
