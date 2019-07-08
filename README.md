# Introduction

Writing Vue components is a pleasure, but when it comes time to test them, suddenly the fun goes away. What if there was an easier way to get started testing your components? A way to describe your tests in a familiar declarative format, without having to learn the entire JS testing ecosystem just to be a responsible developer? Well **vue-test-declarative** aims to do just that, letting you spend more time thinking about what to test and less time thinking about the details of running the tests.

Its aim is to sit alongside vue-test-utils and provide an easy to approach entry point into unit testing. The vue-test-utils package will always be available to you for custom behavior or scenarios not covered by vue-test-declarative. In this way vue-test-declarative aims to be additive to the ecosystem, instead of replacing anything.

# Installation

* Create a new vue-cli project with mocha unit testing
  * For existing projects use `vue add @vue/unit-mocha`
* Run `npm install --save-dev vue-test-declarative expect jsdom jsdom-global`
* Add `"test:declarative": "vue-test-declarative"` to the `scripts` section of package.json

# Usage

For this example we'll test the `HelloWorld` component from the default vue-cli template. 

## Write test
Create a `HelloWorld.vuetest` file anywhere in your project with these contents:

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

## Run tests

`npm run test:declarative`

This command will generate and run mocha tests for all .vuetest files in your project.

# Documentation

👉 [API Docs](https://github.com/johnsusek/vue-test-declarative/blob/master/docs/API.md)

# Examples

Users are highly encouraged to check out the [example TodoMVC app](), which adds .vuetest coverage to the official TodoMVC example. 

# Feedback

**Feedback encouraged**, please file a github issue. This is the early days of this project so your feedback is critical in guiding the design!

# Contributing

**Contributors wanted**, I am actively looking for people to help with this project. There is a lot of work left to do, including the design of the API. If you like the idea of this project and want to help out, please email john@johnsolo.net or @jsusek. 

