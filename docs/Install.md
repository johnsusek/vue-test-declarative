# Intro 
Vue-test-declarative is easiest to use out-of-the-box with a recent vue-cli project configured for unit testing. If you're starting a new project, it's suggested to go that route.

For older projects, you may need to install some additional packages to get up-and-running.

# Scenario: vue 2.5 project

* Run `npm install --save-dev vue-test-declarative @vue/test-utils mocha@5 mocha-webpack expect jsdom jsdom-global`
* Add `"test:declarative": "vue-test-declarative"` to the `scripts` section of package.json


