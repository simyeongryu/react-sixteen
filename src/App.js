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
