const fs = require("node:fs");
const path = require("node:path");

if (process.platform === "win32" && !process.env.CHROME_BIN) {
  const chromePaths = [
    path.join(process.env.PROGRAMFILES || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env["PROGRAMFILES(X86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
  ];
  const edgePaths = [
    path.join(process.env["PROGRAMFILES(X86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env.PROGRAMFILES || "", "Microsoft", "Edge", "Application", "msedge.exe"),
  ];
  if (!chromePaths.some((browserPath) => fs.existsSync(browserPath))) {
    const edgePath = edgePaths.find((browserPath) => fs.existsSync(browserPath));
    if (edgePath) process.env.CHROME_BIN = edgePath;
  }
}

module.exports = function configureKarma(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "tests/storefrontData.test.js",
      "tests/components.test.jsx",
    ],
    preprocessors: {
      "tests/storefrontData.test.js": ["webpack"],
      "tests/components.test.jsx": ["webpack"],
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [{
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                ["@babel/preset-env", { targets: { chrome: "120" } }],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
              plugins: [["istanbul", {
                exclude: ["**/tests/**", "**/*.test.js", "**/*.test.jsx"],
              }]],
            },
          },
        }],
      },
    },
    webpackMiddleware: { stats: "errors-only" },
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-webpack",
    ],
    reporters: ["dots", "coverage"],
    coverageReporter: {
      dir: "coverage",
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["**/node_modules/**"],
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text", subdir: ".", file: "text.txt" },
        { type: "text-summary", subdir: ".", file: "text-summary.txt" },
      ],
    },
    browsers: ["ChromeHeadless"],
    singleRun: true,
    restartOnFileChange: true,
  });
};
