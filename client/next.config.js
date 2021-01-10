module.exports = {
  env: {
    darkSkyKey: '120b38d1f0ebcdc55f5a89dab6a3ec5a',
    geocodeKey: 'AIzaSyAlMZnbfK7fw4o3d23DGkaXFxa0DQ7FPJA',
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
