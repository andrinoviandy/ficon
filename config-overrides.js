const webpack = require("webpack");

module.exports = function override(config) {
  // Update module resolution to resolve modules from 'src' directory
  config.resolve.modules.push(__dirname + '/src');

  // Add custom paths for module resolution
  config.resolve.alias = {
    views: __dirname + '/src/views'
    // Add more aliases if needed
  };

  // Add fallbacks for node.js core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    vm: require.resolve("vm-browserify"),
  });
  config.resolve.fallback = fallback;

  // Provide plugins
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Ignore specific warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  // Add source-map-loader for better source map support
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};