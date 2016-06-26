/**
 * Created by mak on 6/25/16.
 */
module.exports = {
  inline: true,
  contentBase: './',
  port: 3000,
  options: {
    watchOptions: 100
  },
  proxy: {
    '/api': 'http://localhost:8080'
  },
  stats: 'minimal'
};
