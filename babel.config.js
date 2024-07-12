module.exports = function (api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@gcMobile': './src',
                    },
                },
            ],
            'react-native-reanimated/plugin',
            // ["react-native-reanimated/plugin"],
        ],
    }
}
