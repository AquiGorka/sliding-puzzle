import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.dev.config.js';
import webpackProductionConfig from './webpack.prod.config.js';

gulp.task('wp.dev', done => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) done();
  });
});

gulp.task('wp.prod', done => {
  webpack(webpackProductionConfig).run((err, stats) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) done();
  });
});

gulp.task('server', () => {
  let server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: webpackConfig.contentBase,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  });
  server.listen(webpackConfig.port, "localhost", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at http://localhost:' + webpackConfig.port);
  });
});

gulp.task('dev', ['wp.dev', 'server'], done => {
  if (done) done();
});

gulp.task('prod', ['wp.prod'], done => {
  if (done) done();
});

gulp.task('default', function() {
    gulp.start('dev');
});
