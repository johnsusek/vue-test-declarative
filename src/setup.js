let setup = `
  require('babel-register')();
  require('babel-polyfill');
  
  var html;
  var options = { url: 'http://localhost/' };
  this.jsdom = require('jsdom-global')(html, options);

  require('browser-env')();

  // Fixes issue with vue-loader/prettier
  window.Date = Date;
  global.Date = Date;

  // A simple in-memory polyfill for localStorage
  global.localStorage = {
    data: {},
    getItem(key) {
        return this.data[key];
    },
    setItem(key, value) {
        this.data[key] = value;
    },
    removeItem(key) {
        delete this.data[key];
    }
  };
`
module.exports = {
  setup
}