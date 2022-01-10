const CracoLessPlugin = require('craco-less')

module.exports = {
  babel: {
    plugins: ['babel-plugin-styled-components', 'emotion']
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4d487d',
              '@error-color': '#BF291E',
              '@border-radius-base': '5px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
