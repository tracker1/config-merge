 // TODO: Get real targets, with processed yaml inputs
export default inputDirectory => ({
  default: {
    name: 'default',
    path: '.../!default',
    config: {},
    images: {
      'logo.png': 'resolved-path-for-input',
    },
    strings: {
      default: {},
      es: {},
      'es-es': {},
    },
  },
  target: {},
  'target.environment': {},
});
