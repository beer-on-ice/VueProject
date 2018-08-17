module.exports = {
   //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  env: {
    node: true
  },
  'extends': [
    'standard',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [0, {
      "vars": "all",
      "args": "none"
    }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
