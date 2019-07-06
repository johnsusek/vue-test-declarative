# vue-test-declarative

Declarative unit testing for Vue components.

## Installation

This has only been tested on a project scaffolded with the latest vue-cli with the mocha option. Further configuration will be required if you didn't use vue-cli to generate your project. Please file an issue or doc PR if you have good steps for installing this from a fresh project, I will integrate it into the docs.

`npm install --save-dev vue-test-declarative @vue/test-utils expect jsdom jsdom-global`

## Example

First create a new vue-cli project and add mocha unit testing during setup. Then, create a `HelloWorld.vuetest` file (it doesn't matter where, either alongside the component or in a separate directory) with these contents:

```xml
<tests for="HelloWorld" at="@/components">
  <it will="render props.msg when passed" v-bind:props="props">
    <expect text v-bind:to-include="props.msg" />
  </it>
</tests>

<script>
let data = {
  props: {
    msg: 'new message',
  }
};
</script>

```

Then, run the test:

```
./node_modules/.bin/vue-test-declarative
```
