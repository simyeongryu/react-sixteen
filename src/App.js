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
