import React, { Component } from "react";
import "./Footer.css";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.state = {};
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <div className="footer-container">
        <a onClick={this.scrollToTop}>
          <div className="back-to-top">
            <span
              class="iconify"
              data-icon="si-glyph:arrow-two-up"
              data-inline="false"
            ></span>
          </div>
        </a>
        <div className="icon-container">
          <a href="https://github.com/c-kehler">
            <div className="icon">
              <span
                class="iconify"
                data-icon="entypo-social:github"
                data-inline="false"
              ></span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/charles-kehler/">
            <div className="icon">
              <span
                class="iconify"
                data-icon="entypo-social:linkedin"
                data-inline="false"
              ></span>
            </div>
          </a>
          <a href="https://twitter.com/Ckehler2">
            <div className="icon">
              <span
                class="iconify"
                data-icon="ant-design:twitter-outline"
                data-inline="false"
              ></span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
