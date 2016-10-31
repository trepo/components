module.exports = {
     entry: './component.js',
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
