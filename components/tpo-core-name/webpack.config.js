module.exports = {
     entry: './src/component.js',
     output: {
         filename: 'bundle.js',
     },
     module: {
         loaders: [{
             test: /\.html$/,
             loader: 'raw-loader',
         }],
     },
 };
