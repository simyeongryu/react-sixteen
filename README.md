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

# #3 Portals

React는 index.html 안의 `<div id="root">`를 찾아서 마운트 한다.

근데 가끔은 이 root 밖에 컴포넌트를 마운트하고 싶을 때가 있다.

웹 서버 사이드가 있는데, 서버를 바꿀 수 없고, 타이틀은 변경하고 싶을 때 등 사용한다. 

즉, root 밖을 제어하고 싶을 때 portal을 사용한다.

index.html root div위에 html 요소를 만들어보자.

```js
import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

class Portals extends Component {
  // 엘리먼트 대신 포탈을 return
  // react 가 아니라 react-dom
  render = () => {
    // createPortal(component, 제어할 DOM)
    return createPortal(<Message />, document.getElementById("touch"));
  };
}

const Message = () => "Touch It";

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
        <Portals />
      </>
    );
  };
}

export default App;
```

iframe이거나 html을 변경하지 못하거나, 워드프레스 등을 작업할 때 리액트 플러그인을 만들거나 렌더를 하거나 아무튼 root 밖에서 렌더할 때 사용한다. 

```
React.js 는 div를 찾아서 마운트를 하는데(최상단. index,js root id)
React 루트 밖을 변경해야 할 경우 portals를 쓸수 있습니다.
(portals는 리액트 루트 밖에 리액트를 넣을 수 있게 해주며 다른페이지에서 로딩을 할때 유용합니다. iframe, 워드프레스 등.)
또한 potals는 리액트 안에 있지 않고 React.dom에 위치 하게 됩니다.
```