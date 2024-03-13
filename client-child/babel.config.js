module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    env: {
      production: {
        plugins: ["transform-remove-console"],     //removing consoles.log from app during release (production) versions
      }
    }
  }
};


