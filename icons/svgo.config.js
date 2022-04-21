module.exports = {
  plugins: [
    'preset-default',
    'removeXMLNS',
    'removeOffCanvasPaths',
    {
      name: 'removeUselessStrokeAndFill',
      params: {
        removeNone: true
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['width', 'height']
      }
    }
  ]
}
