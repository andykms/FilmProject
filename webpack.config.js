const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: { rules: [{ test: /\.tsx?$/, exclude: ['/node_modules/', /\.(d.ts)$/], use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-typescript'] } } }, 
  {
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
      'css-loader', // Переводит CSS в CommonJS
      'sass-loader', // Компилирует SCSS в CSS
    ],
  },
  ] },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.min.css', // Имя итогового CSS файла
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Минифицирует CSS
    ],
  },
};