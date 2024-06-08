// next.config.js

const webpack = require('webpack');

module.exports = {
    webpack: (config, { isServer }) => {
        // Add the EnvironmentPlugin configuration
        config.plugins.push(
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                WS_NO_BUFFER_UTIL: 1,
                WS_NO_UTF_8_VALIDATE: 1,
            })
        );

        return config;
    },
};
