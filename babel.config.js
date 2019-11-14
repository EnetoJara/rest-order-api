module.exports = function (api) {
    api.cache(()=> process.env.NODE_ENV);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                targets: {
                    node: "current",
                    esmodules: "commonjs"
                },
                useBuiltIns: 'entry',
                corejs: 3,
            }],
            "@babel/preset-typescript"
        ],
        plugins: [["@babel/plugin-transform-runtime", {corejs: 3}]]
    }
}