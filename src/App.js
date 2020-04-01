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
const ErrorFallback = () => "Sorry Something went wrong";

class App extends Component {
  state = {
    hasError: false
  };

  // error 잡기
  componentDidCatch = (error, info) => {
    // info는 객체로 나와서 문자열 처리를 해줘야 보인다.
    console.log(`Error: ${error} // Info: ${JSON.stringify(info)}`);
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
