# Installation 

Vue-test-declarative is easiest to use out-of-the-box with a recent vue-cli project configured for mocha unit testing. If you're starting a new project, it's suggested to go that route. If you have a vue-cli project, but without unit testing, use the command `vue add @vue/unit-mocha`.

For older projects, you may need to install some additional packages to get up-and-running.

Below are various scenarios and instructions for adding vue-test-declarative to these types of projects. 

# Scenario 1: Adding to a Vue 2.5 project

* Run `npm install --save-dev vue-test-declarative @vue/test-utils mocha@5 mochapack expect jsdom jsdom-global browser-env babel-register babel-polyfill`
* Write and run a test like in the usage example. 
  * You may need to create a `vuetest.config.json` file with your webpack config path (see configuration section of README). 

# Scenario 2: Adding to the official [Vuex TodoMVC example](https://github.com/vuejs/vuex/tree/dev/examples/todomvc)

* Run `npm install --save-dev vue-test-declarative expect jsdom jsdom-global browser-env babel-register babel-polyfill mochapack` from project root.

Create config file `vuetest.config.json` with these contents:
```json
{
  "webpackConfigPath": "examples/webpack.config.js"
}
```

Create test file `tests/declarative/App.vuetest` in this directory with these contents:
```xml
<tests for="../../examples/todomvc/components/App.vue">
  <it will="Render app">
    <expect html to-match="todos" />
  </it>
</tests>
```

Create setup file `tests/declarative/vuetest.setup.js` in this directory with these contents:
```javascript
import store from '../../examples/todomvc/store'
```

<br>

If you're having trouble adding vue-test-declarative to your project, please file a github issue!
