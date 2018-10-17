const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const log = require("fancy-log");
const colors = require("ansi-colors");

/** Local variables **/
const executingCommand = process.env.npm_lifecycle_event;

const isProd = executingCommand === "build";
const isTest = /^test/.test(executingCommand);

const environment = isProd ? "production" : "development";

logEnvironmentVariables();

module.exports = {
  mode: environment,
  entry: isTest ? null : "./src/main.js",
  output: {
    path: path.join(__dirname, "./dist"),
    chunkFilename: `vendors.js`,
    filename: `app.js`
  },
  devtool: isProd ? false : "cheap-module-eval-source-map",
  optimization: {
    splitChunks: isProd
      ? false
      : {
          chunks: "all"
        }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: `fonts/[name]-.[ext]`
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new ExtractCssChunks({
      filename: `app.css`,
      chunkFilename: `vendors.css`
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 8080,
    compress: true,
    clientLogLevel: "warning",
    historyApiFallback: true,
    contentBase: path.join(__dirname, "src")
  }
};

function logEnvironmentVariables() {
  console.log(
    colors.magenta("###################################################")
  );
  _logVariable("NODE_ENV", isTest ? "test" : environment);
  console.log(
    colors.magenta("###################################################\n\n")
  );
}

function _logVariable(name = "", value = "") {
  log(name, colors.cyan(value));
}
