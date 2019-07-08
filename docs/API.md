# API

## \<tests>
```xml
<tests for="ComponentPath">
```

### ComponentPath

This is the path to the component, used when importing it into your tests. 

## \<it>
```xml
<it will="WillValue" BindingTarget="BindingValue">
```

### WillValue
This is used as the description for the test case.

### BindingTarget

#### `v-bind:props`
Sets the props of your component to these values before running the test.

#### `v-bind:data`
Sets the data of your component to these values before running the test.

### BindingValue

The BindingTarget will be set to this value of the `context` variable in your `<script>` tag. 

## \<expect>
```xml
<expect ReturnValue Matcher="MatchedValue">
```

### ReturnValues

#### `text`

#### `html`

#### `text-of="selector"`

#### `html-of="selector"`

### Matchers

#### `to-match`

#### `to-equal`

### MatchedValues

## \<script>
```xml
<script>
  let context = {...}
</script>
```

The contents of the `<script>` tag are executed before your tests start. 

The special `context` variable is where bindings connect to your data; e.g. `v-bind:props="myProps"` sets your component's props to whatever is in `context.myProps`. This must be set if you are using bindings.

Generated tests are run from a subdirectory of the project root. It's suggested to use the webpack alias `@` to resolve paths to your files when using imports in your script tag.
