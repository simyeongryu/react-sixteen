# React Sixteen

# #1 Project Setup

```shell
$ yarn create react-app
```

# #2 Return Types Strings and Fragments

16이전 return은 하나의 component 아니면 null을 리턴했다.

여러 개를 return 하고자 한다면, 배열을 사용하거나 `<span>`을 이용해 전부를 감싸줘야 했는데, 16에서 `<Fragment>`가 나와 편하고, 더 정확하게 작업할 수 있게 됐다.

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

# #4 Error Boundaries

부모 컴포넌트가 자식 컴포넌트의 에러를 관리할 수 있다.

```js
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
```
만약 위 예제에서 `<ReturnTypes />`, `<Portals />` 에서 에러가 발생한다면 `App`이 그 에러를 관리할 수 있다.

주의해야 할 것은 본인이 본인의 에러를 관리하는 것이 아니다. 즉, `<Portals />`이 `<Portals />`의 에러를 관리하지 않고 `App`이 `<Portals />`의 에러를 관리한다.

```js
import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

class ErrorMaker extends Component {
  state = {
    friends: ["noel", "liam", "bonehead", "tony", "guigsy"]
  };

  // 2초 후에 state의 friends가 undefined로 변하며 Error
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      });
    }, 2000);
  };

  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

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
        <Portals />
        <ReturnTypes />
        <ErrorMaker />
      </>
    );
  };
}

export default App;
```

위 예제에서 ErrorMaker에 의해 2초 후 Error 가 발생한다. (state의 friends 값이 undefined로 변함)

`componentDidCatch()`를 이용하면 된다.

```js
import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

class ErrorMaker extends Component {
  state = {
    friends: ["noel", "liam", "bonehead", "tony", "guigsy"]
  };

  // 2초 후에 state의 friends가 undefined로 변하며 Error
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      });
    }, 2000);
  };

  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

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
// Error 발생 시 마운트 될 컴포넌트
const ErrorFallback = () => "Sorry Something went wrong";

class App extends Component {
  state = {
    hasError: false
  };

  // error 잡기
  componentDidCatch = (error, info) => {
    // info는 객체로 나와서 문자열 처리를 해줘야 보인다.
    console.log(`Error: ${error} // Info: ${JSON.stringify(info)}`);
    // error 상태 변경
    this.setState({
      hasError: true
    });
  };

  render = () => {
    const { hasError } = this.state;
    return (
      <Fragment>
        <ReturnTypes />
        <Portals />
        {/* Error가 있으면 ErrorFallback 마운트 */}
        {hasError ? <ErrorFallback /> : <ErrorMaker />}
      </Fragment>
    );
  };
}

export default App;
```

위와 같이 에러 경계처리를 해주면, 특정 부분에서 error가 발생하더라도 다른 component들이 망가지지 않는다. try - catch와 비슷하다.

그러나 지금 방법은 에러를 관리해야 할 컴포넌트 수가 많아지면 일일이 작성하기 어렵다.

# #5 Error Boundaries with Higher Order Components

HOC을 이용한 에러 관리

```js
import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

// HOC
const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };

    // error가 발생하면
    componentDidCatch = (error, info) => {
      console.log(`ERROR: ${error} // INFO: ${JSON.stringify(info)}`);
      this.setState({
        hasError: true
      });
    };

    render() {
      const { hasError } = this.state;
      // error가 발생하면 FallbackUI 아니면 파라미터로 받은 component
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };

class ErrorMaker extends Component {
  state = {
    friends: ["noel", "liam", "bonehead", "tony", "guigsy"]
  };

  // 2초 후에 state의 friends가 undefined로 변하며 Error
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      });
    }, 2000);
  };

  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

// HOC로 보호
const PErrorMaker = BoundaryHOC(ErrorMaker);

// root 밖의 요소를 제어할 때 사용
class Portals extends Component {
  // 엘리먼트 대신 포탈을 return
  // react 가 아니라 react-dom
  render = () => {
    // createPortal(component, 제어할 DOM)
    return createPortal(<Message />, document.getElementById("touch"));
  };
}
// HOC로 보호
const PPortals = BoundaryHOC(Portals);

const Message = () => "Touch It";

// 하나가 아니라 두 개 이상을 return 하고 싶다면 Fragment를 사용한다.
// String도 return 할 수 있다.
class ReturnTypes extends Component {
  render = () => {
    return "Hello WOW";
  };
}
// HOC로 보호
const PReturnTypes = BoundaryHOC(ReturnTypes);

// 에러가 발생하면 대신 마운트되는 컴포넌트
const ErrorFallback = () => "Sorry Something went wrong";

class App extends Component {
  render = () => {
    return (
      <Fragment>
        {/* HOC로 보호된 컴포넌트 */}
        <PReturnTypes />
        <PPortals />
        <PErrorMaker />
      </Fragment>
    );
  };
}

// export할 때도 보호할 수 있다.
export default BoundaryHOC(App);
```

# #6 this.setState(null)

컴포넌트 업데이트 프로세스

setState를 하면 컴포넌트는 반드시 업데이트 된다.

근데 이걸 제어할 수 있다. 

언제 컴포넌트를 업데이트할지 결정할 수 있게 한다. 

setState(null)을 해주면, state와 컴포넌트의 업데이트가 멈춘다.

```js
import React, { Component, Fragment } from "react";

const MAX_PIZZAS = 20;

// setState 형식에 맞춤
const eatPizza = (state, props) => {
  const { pizzas } = state;
  if (pizzas < MAX_PIZZAS) {
    return {
      pizzas: pizzas + 1
    };
  } else {
    // null이 되면 state도 안 바뀌고, 컴포넌트도 변하지 않는다.
    return null;
  }
};

class Contorlled extends Component {
  state = {
    pizzas: 0
  };
  render() {
    const { pizzas } = this.state;
    return (
      <button onClick={this._handleClick}>{`I have eaten ${pizzas} ${
        pizzas === 1 ? "pizza" : "pizzas"
      } `}</button>
    );
  }
  // component 밖에서 setState를 사용할 수 있는 방법
  _handleClick = () => {
    this.setState(eatPizza);
  };
}
class App extends Component {
  render = () => {
    return <Contorlled />;
  };
}

// export할 때도 보호할 수 있다.
export default App;
```