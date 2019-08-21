# Introduction

Writing Vue components is a pleasure, but when it comes time to test them, suddenly the fun goes away. 

What if there was an easier way to get started testing your components? 

A way to describe your tests in a familiar declarative format, without having to learn the entire JS testing ecosystem just to be a responsible developer? 

Well **vue-test-declarative** aims to do just that, letting you spend more time thinking about what to test and less time thinking about the details of running the tests.

Its aim is to sit alongside [vue-test-utils](https://github.com/vuejs/vue-test-utils) and provide an easy to approach entry point into component unit testing. The vue-test-utils package will always be available to you for custom behavior or scenarios not covered by vue-test-declarative. In this way vue-test-declarative aims to be additive to the ecosystem, instead of replacing anything. 

Think of it like an "easy mode" for Vue unit testing.

# Prerequisites
* A vue-cli project with mocha unit testing
  * For existing vue-cli projects without mocha unit testing, run `vue add @vue/unit-mocha`
* For older projects, non vue-cli projects, and other installation scenarios, [see more detailed install instructions here](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/Install.md)

# Installation

* `npm install --save-dev vue-test-declarative expect jsdom jsdom-global browser-env babel-register babel-polyfill mochapack`
  * This command installs vue-test-declarative and other packages used by its test setup file

# Usage

vue-test-declarative uses a new file format `.vuetest` that is similar to a `.vue` component. 

The file is split into two sections, the `<tests>` and the `<script>`. 
* The `<tests>` section describes a list of unit tests using a declarative markup syntax. 
* The `<script>` section contains code that will be executed before each test and can include a special `context` variable for binding data to a test. 

More details are available in the [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md).

## Examples

### Simplest

Here's a very simple test file that just checks for the specified text anywhere in the rendered component.

```xml
<tests for="@/components/MyComponent.vue">
  <test name="Contains success message">
    <expect text to-match="Success!" />
  </it>
</tests>
```

### HelloWorld

For this example, we'll test the `HelloWorld` component from the [default vue-cli template](https://github.com/vuejs/vue-cli/blob/master/packages/@vue/cli-service/generator/template/src/components/HelloWorld.vue) that we've all seen when starting a new project. 

Create a `HelloWorld.vuetest` file in the `tests/declarative` directory with these contents:

```vue
<tests for="@/components/HelloWorld.vue">
  <test name="Render message correctly" :props="props">
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

This simple test __expects__ for the component __text to match__ "Welcome!" in the rendered HelloWorld component. This component uses a prop named msg to display a welcome message, so we pass one in using our script section.

See all tags and options in the [API docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md).

### TodoMVC

Here is a test from the TodoMVC tests that shows how interactions work:

```vue
<test name="add a todo">
  <set selector=".new-todo" value="First" />
  <trigger selector=".new-todo" event="keyup.enter" />
  <expect text-of=".todo-list li" to-match="First" />
  <expect text-of=".todo-count" to-match="1 item left" />
</test>
```

## Run tests

`npm run test:declarative`

This command will generate and run mocha tests for all `.vuetest` files in your test path (defaults to `tests/declarative`).

`npm run test:declarative -- --keep`

This command is the same as above but will not delete the generated mocha tests after running.

## vuetest.setup.js

Sometimes your tests will require you to import and register components you are using (like vuetify or element-ui), or run other setup before a test. If you need this functionality, create a `vuetest.setup.js` file in the `tests/declarative` directory that defines a variable called `localVue`. This will be used instead of the default Vue instance when running your tests.

```javascript
import ElementUI from 'element-ui';
import { createLocalVue } from '@vue/test-utils';

let localVue = createLocalVue();
localVue.use(ElementUI);
```

Any additional javascript required by your tests can be added to this file, and it will be executed before your tests are run. In general, any test-specific javascript should go into your .vuetest `<script>` section, while anything global to all tests should go into your vuetest.setup.js file.

# Configuration

Create a `vuetest.config.json` file in your project root. This file may contain options to configure vue-test-declarative. The following options are supported:

## `testsPath`

vue-test-declarative defaults to looking for tests in `tests/declarative`. Use this config setting if you want to place your .vuetest and vuetest.setup.js files somewhere else.

## `webpackConfigPath`

vue-test-declarative tries to find your webpack config automatically if you are using a vue-cli template. If your webpack.config.js file is in another location, set its path here.

# Documentation

👉 [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md)

👉 [Installation](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/Install.md)

👉 [TodoMVC Example Test Suite](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/examples/Vuex-TodoMVC.vuetest)

# Feedback

**Feedback encouraged**, please file a github issue. This is the early days of this project so your feedback is critical in guiding the design!

# Contributing

**Contributors wanted**, I am actively looking for people to help with this project. There is a lot of work left to do, including the design of the API. If you like the idea of this project and want to help out, please email john@johnsolo.net. 

