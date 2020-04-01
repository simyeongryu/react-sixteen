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
