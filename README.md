# Introduction

Vue unit testing EZ-mode. Introducing .vuetest files.

# Installation

```js
vue add @vue/unit-jest
vue add @vue/unit-mocha
yarn add --dev vue-test-declarative babel-register babel-polyfill browser-env
```

This command installs vue-test-declarative and other packages used by the generated tests.

See configuration section below if you are using a custom webpack config location.

# Usage

1) Create a file `HelloWorld.vuetest` in `tests/declarative`:
```xml
<tests for="@/components/HelloWorld.vue">
  <test name="Contains welcome message">
    <expect text to-match="Welcome" />
  </test>
</tests>
```

2) Run `npm run test:declarative` 

More details are available in the [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md).

## Examples

### Props

For this example, we'll test the `HelloWorld` component from the [default vue-cli template](https://github.com/vuejs/vue-cli/blob/master/packages/@vue/cli-service/generator/template/src/components/HelloWorld.vue) that we've all seen when starting a new project. 

Create a `HelloWorld.vuetest` file in the `tests/declarative` directory with these contents:

```vue
<tests for="@/components/HelloWorld.vue">
  <test name="Render message correctly" :props="props">
    <expect text to-match="Success!" />
  </test>
</tests>

<script>
let context = {
  props: {
    msg: 'Success!',
  }
};
</script>
```

This simple test __expects__ for the component __text to match__ "Welcome!" in the rendered HelloWorld component. This component uses a prop named msg to display a welcome message, so we pass one in using our script section.

See all tags and options in the [API docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md).

### Interactions

Here is a test for the official TodoMVC example that shows how interactions work:

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

Any additional javascript required by your tests can be added to this file, and it will be executed before your tests are run. 

**In general, any test/component-specific javascript should go into your .vuetest `<script>` section, while anything global to all tests should go into your vuetest.setup.js file.**

# Configuration

Create a `vuetest.config.json` file in your project root. This file may contain options to configure vue-test-declarative. The following options are supported:

### `testsPath`

vue-test-declarative defaults to looking for tests in `tests/declarative`. Use this config setting if you want to place your .vuetest and vuetest.setup.js files somewhere else.

### `webpackConfigPath`

vue-test-declarative tries to find your webpack config automatically if you are using a vue-cli template. If your webpack.config.js file is in another location, set its path here.

# Documentation

👉 [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md)

👉 [TodoMVC Example Test Suite](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/examples/Vuex-TodoMVC.vuetest)

# Tips

💡 Set the syntax highlighting in your editor to vue, vue-html, or xml when working with .vuetest files.
