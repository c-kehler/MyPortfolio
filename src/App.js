import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Nav/Navbar";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <div className="App">
      <Home />
      <Navbar />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
