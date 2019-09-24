import React from "react";
import * as THREE from "three";
import NET from "./vanta/vanta.net.min.js";

class Home extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.effect = NET({
      el: this.myRef.current,
      color: 0x457b9d,
      backgroundColor: 0x1a0048,
      maxDistance: 22.0
    });
  }
  componentWillUnmount() {
    if (this.effect) this.effect.destroy();
  }
  render() {
    return (
      <div className="header-background-container" ref={this.myRef}>
        <div className="welcome-text">
          <div className="welcome-firstline">
            <p>Hello, I'm</p>
            <p className="welcome-colored">Charlie Kehler</p>
          </div>
          <div className="welcome-second-line">
            <p>I'm a full-stack web developer.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
