const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your React app
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use Babel to transpile React code
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use these loaders to process CSS
      },

    ],


  },
  devServer: {
    static: './dist', // Serve files from the 'dist' folder
    open: true, // Open the browser automatically
    hot: true, // Enable hot module replacement
    port: 8080, // Use port 8080 for the dev server
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML file
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JSX files
  },
};
