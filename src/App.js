import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Nav/Navbar";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import * as Scroll from "react-scroll";
import Sidenav from "./components/Nav/Sidenav";
import Footer from "./components/Footer/Footer";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

function App() {
  return (
    <div className="App">
      <Sidenav />
      <Element name="home" className="element">
        <Home />
      </Element>
      <Navbar />
      <Element name="about" className="element">
        <About />
      </Element>
      <Element name="project" className="element">
        <Projects />
      </Element>
      <Element name="contact" className="element">
        <Contact />
      </Element>
      <Footer />
    </div>
  );
}

export default App;
