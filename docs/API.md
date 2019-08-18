# API

## `<tests>`
```xml
<tests for="ComponentPath">
```

### ComponentPath

This is the path to the component, used when importing it into your tests. Webpack aliases are supported.

<br>

## `<it>`
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

#### Examples:
```xml
<it will="render app">
```
```xml
<it will="render message correctly" v-bind:props="myProps">
```
```xml
<it will="render data value correctly" v-bind:data="myData">
```

<br>

## `<trigger>`
```xml
<trigger selector="SelectorValue" event="EventValue" />
```

Triggers event named EventValue on the element(s) returned by SelectorValue.

#### Examples: 
```xml
<trigger selector=".el-select" event="change" />
```

<br>

## `<expect>`
```xml
<expect ReturnValue Matcher="MatchedValue" />
```

### ReturnValues

#### `text`

Match any text in the component.

#### `html`

Match any html in the component.

#### `text-of="selector"`

Match text of the selector.

#### `html-of="selector"`

Match html of the selector.

### Matchers

#### `to-match`

Matches value as a substring of the matcher content.

#### `to-equal`

Matches value exactly on the matcher content.

### MatchedValues

#### Examples:

```xml
  <expect text to-match="Welcome!" />
```

```xml
  <expect html to-match="Welcome!">
    <html>
      <h1> foo </h1>
    </html>
  </expect>
```

<br>

## `<script>`
```xml
<script>
  let context = {...}
</script>
```

The contents of the `<script>` tag are executed before your tests start. 

The special `context` variable is where bindings connect to your data; e.g. `v-bind:props="myProps"` sets your component's props to whatever is in `context.myProps`. This must be defined if you are using bindings.

#### Examples:
```xml
<script>
let context = {
  myProps: {
    msg: 'Welcome!',
  }
};
</script>
```
