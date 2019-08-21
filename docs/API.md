# API

In summary, a .vuetest file looks like this:
```xml
<tests>
  <test>
    <set>
    <trigger>
    <expect>
  </test>
</tests>

<script></script>
```

See below for details about each of these tags.

<br>

## `<tests>`

<details>
 <summary>Details</summary>

```xml
<tests for="ComponentPath">
```

### ComponentPath

This is the path to the component, used when importing it into your tests. Webpack aliases are supported.

</details>

<br>

## `<test>`
<details>
 <summary>Details</summary>

```xml
<test name="NameValue" BindingTarget="BindingValue">
```

### NameValue
This is used as the display name when running the test.

### BindingTarget

#### `v-bind:props`
Sets the props of your component to these values before running the test.

#### `v-bind:data`
Sets the data of your component to these values before running the test.

### BindingValue

The BindingTarget will be set to this value of the `context` variable in your `<script>` tag. 

#### Examples:
```xml
<test name="render app">
```
```xml
<test name="render message correctly" v-bind:props="myProps">
```
```xml
<test name="render data value correctly" v-bind:data="myData">
```

</details>

<br>

## `<set>`

<details>
 <summary>Details</summary>

```xml
<set selector="SelectorValue" value="Value" />
```

Sets form input (text or select) value to Value.

#### Examples:

```xml
<set selector="input.first-name" value="Bob" />
```

```xml
<set selector="select.title" value="Mr." />
```

</details>

<br>

## `<trigger>`

<details>
 <summary>Details</summary>

```xml
<trigger selector="SelectorValue" event="EventValue" />
```

Triggers event named EventValue on the element(s) returned by SelectorValue.

#### Examples: 
```xml
<trigger selector=".el-select" event="change" />
```

</details>

<br>

## `<expect>`

<details>
 <summary>Details</summary>

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

#### `to-be-truthy`

Matches anything that an "if" statement treats as true.

#### `to-be-falsy`

Matches anything that an "if" statement treats as false.

#### `to-be-defined`

Matches if value is defined.

#### `to-be-undefined`

Matches if value is undefined.

#### `to-be-null`

Matches if value is null.

#### Examples:

```xml
<expect html to-match="Welcome!" />
```

```xml
<expect text-of=".todo-list li" to-match="First" />
```

```xml
<expect text-of=".todo-list" to-be-falsy />
```

```xml
<expect html to-match="Welcome!">
  <html>
    <h1> foo </h1>
  </html>
</expect>
```

</details>

<br>

## `<script>`

<details>
 <summary>Details</summary>

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

</details>

<br>
