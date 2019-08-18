# Introduction

Writing Vue components is a pleasure, but when it comes time to test them, suddenly the fun goes away. What if there was an easier way to get started testing your components? A way to describe your tests in a familiar declarative format, without having to learn the entire JS testing ecosystem just to be a responsible developer? Well **vue-test-declarative** aims to do just that, letting you spend more time thinking about what to test and less time thinking about the details of running the tests.

Its aim is to sit alongside [vue-test-utils](https://github.com/vuejs/vue-test-utils) and provide an easy to approach entry point into component unit testing. The vue-test-utils package will always be available to you for custom behavior or scenarios not covered by vue-test-declarative. In this way vue-test-declarative aims to be additive to the ecosystem, instead of replacing anything. Think of it like an "easy mode" if you're just getting started writing unit tests.

# Installation

* Create a new vue-cli project with mocha unit testing, or for existing vue-cli projects use `vue add @vue/unit-mocha`
  * For older projects, non vue-cli projects, and other installation scenarios, [see here](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/Install.md)
* Run `npm install --save-dev vue-test-declarative expect jsdom jsdom-global browser-env babel-register babel-polyfill`
  * This command installs vue-test-declarative and other packages used by its default test setup file
* Add `"test:declarative": "vue-test-declarative"` to the `scripts` section of package.json
  * This line allows you to use `npm run test:declarative` to run your tests
* Create directory `test/declarative` for your tests and setup file.

# Usage

vue-test-declarative uses a new file format `.vuetest` that is similar to a `.vue` component. The file is split into two sections, the `<tests>` and the `<script>`. The `<tests>` section describes a list of unit tests using a declarative markup syntax. The `<script>` section contains code that will be executed before each test and can include a special `context` variable for binding data to a test. More details are available in the [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md).

## Example test

For this example, we'll test the `HelloWorld` component from the default vue-cli template. 

Create a `HelloWorld.vuetest` file in the `test/declarative` directory with these contents:

```xml
<tests for="@/components/HelloWorld.vue">
  <it will="render message correctly" v-bind:props="props">
    <expect text to-match="Welcome!" />
  </it>
</tests>

<script>
let context = {
  props: {
    msg: 'Welcome!',
  }
};
</script>
```

This simple test __expects__ for the __text to match__ "Welcome!" in the rendered HelloWorld component. This component uses a prop named msg to display a welcome message, so we pass one in using our script section.

## Run tests

`npm run test:declarative`

This command will generate and run mocha tests for all `.vuetest` files in your test path (defaults to `test/declarative`).

## vuetest.setup.js

Sometimes your tests will require you to import and register components you are using (like vuetify or element-ui), or run other setup before a test. If you need this functionality, create a `vuetest.setup.js` file in the `test/declarative` directory that defines a variable called `localVue`. This will be used instead of the default Vue instance when running your tests.

```javascript
import ElementUI from 'element-ui';
import { createLocalVue } from '@vue/test-utils';

let localVue = createLocalVue();
localVue.use(ElementUI);
```

Any additional javascript required by your tests can be added to this file, and it will be executed before your tests are run.

# Configuration

Create a `vuetest.config.json` file in your project root. This file may contain options to configure vue-test-declarative. The following options are supported:

## `testsPath`

vue-test-declarative defaults to looking for tests in `test/declarative` (which you will have to create the first time you write a test). Use this config setting if you want to place your .vuetest and vuetest.setup.js files somewhere else.

## `webpackConfigPath`

vue-test-declarative tries to find your webpack config automatically if you are using a vue-cli template. If your webpack.config.js file is in another location, set its path here.

# Documentation

👉 [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md)

👉 [Installation](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md)

# Feedback

**Feedback encouraged**, please file a github issue. This is the early days of this project so your feedback is critical in guiding the design!

# Contributing

**Contributors wanted**, I am actively looking for people to help with this project. There is a lot of work left to do, including the design of the API. If you like the idea of this project and want to help out, please email john@johnsolo.net. 

