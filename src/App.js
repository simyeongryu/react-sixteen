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
