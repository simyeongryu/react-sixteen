# React Sixteen

# #1 Project Setup

```shell
$ yarn create react-app
```

# #2 Return Types Strings and Fragments

16이전 return은 하나의 components 아니면 null

여러 개를 return 하고자 한다면,

배열을 사용하거나
```js
// 하나가 아니라 두 개 이상을 리턴하고 싶다면?
// 16 이전엔 배열을 사용하거나 <span>을 이용했다.
class ReturnTypes extends React.Component {
  render = () => {
    return [
      <header key={1}></header>,
      <div key={2}></div>,
      <footer key={3}></footer>
    ];
  };
}
```
`<span>`을 사용했다.
```js
class ReturnTypes extends React.Component {
  render = () => {
    return (
      <span>
        <header></header>
        <div></div>
        <footer></footer>
      </span>
    );
  };
}
```

16 버전 이후에는 Fragment를 사용하면 된다.

```js
import React, { Component, Fragment } from "react";

// 하나가 아니라 두 개 이상을 리턴하고 싶다면?
// 16 이전엔 배열을 사용하거나 <span>을 이용했다.
class ReturnTypes extends Component {
  render = () => {
    return (
      <Fragment>
        <header></header>
        <div></div>
        <footer></footer>
      </Fragment>
    );
  };
}
```
혹은
```js
import React, { Component, Fragment } from "react";

// 하나가 아니라 두 개 이상을 리턴하고 싶다면?
// 16 이전엔 배열을 사용하거나 <span>을 이용했다.
class ReturnTypes extends Component {
  render = () => {
    return (
      <>
        <header></header>
        <div></div>
        <footer></footer>
      </>
    );
  };
}
```

그리고 이제 String도 return 할 수 있다.

```js
import React, { Component, Fragment } from "react";

// 하나가 아니라 두 개 이상을 return 하고 싶다면 Fragment를 사용한다.
class ReturnTypes extends Component {
  render = () => {
    return "Hello WOW";
  };
}

class App extends Component {
  render = () => {
    return (
      <>
        <ReturnTypes />
        <ReturnTypes />
        <ReturnTypes />
        <ReturnTypes />
        <ReturnTypes />
      </>
    );
  };
}

export default App;
```