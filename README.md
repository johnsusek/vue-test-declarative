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
    <expect text v-bind:to-match="props.msg" />
  </it>
</tests>

<script>
let context = {
  props: {
    msg: 'new message',
  }
};
</script>

```

Then, run the tests. This command will generate mocha tests from your .vuetest files and run them.

```
./node_modules/.bin/vue-test-declarative
```


## More examples

### Basic matching of any text in the component 
```xml
<expect text to-match="test message" />
```

### Using a selector

```xml
<expect text-of=".hello" to-match="test message" />
```

### With binding. Anything in `context` can be bound. 

```xml
<expect text v-bind:to-match="props.msg" />
```

### HTML matching. Note indenting gets collapsed for comparisons. 

```xml
<expect html to-match>
  <html>
    <div class="hello"><h1 class="message"> test message </h1></div>
  </html>
</expect>
```

### With a selector 

```xml
<expect html-of=".message" to-match>
  <html>
    <h1 class="message"> test message </h1>
  </html>
</expect>
```
