const path = require("path");

module.exports = (_env, argv) => {
    const production = argv.mode === "production";

    const config = {
        mode: production ? "production" : "development",
        entry: {
            "content-script": "./src/content-script.ts",
        },
        output: {
            path: path.resolve(__dirname, "./public"),
            filename: "[name].bundle.js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                },
            ],
        },
    };

    if (!production) {
        Object.assign(config, { devtool: "inline-source-map" });
    }

    return config;
};
