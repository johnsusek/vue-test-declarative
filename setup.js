let setup = `
  require('jsdom-global')();

  // Fixes issue with vue-loader/prettier
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