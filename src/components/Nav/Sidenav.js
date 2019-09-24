import { bubble as Menu } from "react-burger-menu";
import React from "react";
import "./Sidenav.css";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll,
  scrollSpy,
  scroller
} from "react-scroll";

class Sidenav extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
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
      </Menu>
    );
  }
}
export default Sidenav;
