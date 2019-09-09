/* eslint-disable */
import React from "react";
import "./Navbar.css";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll,
  scrollSpy,
  scroller
} from "react-scroll";
const durationFn = function(deltaTop) {
  return deltaTop;
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo(offset) {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: offset
    });
  }
  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo("scroll-container-second-element", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  render() {
    return (
      <header>
        <nav class="container">
          <a>
            <div class="home">
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                duration={500}
              >
                HOME
              </Link>
            </div>
          </a>
          <a>
            <div class="about">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                duration={500}
              >
                ABOUT
              </Link>
            </div>
          </a>
          <a>
            <div class="projects">
              <Link
                activeClass="active"
                to="project"
                spy={true}
                smooth={true}
                duration={500}
                isDynamic={true}
              >
                PROJECTS
              </Link>
            </div>
          </a>
          <div class="contact">
            <a>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
              >
                CONTACT
              </Link>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
