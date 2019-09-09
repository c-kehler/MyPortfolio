import React from "react";
import "./About.css";
import Bounce from "react-reveal/Zoom";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">ABOUT</div>
      <div className="who-i-am-container">
        <Bounce left>
          <div className="me-image"></div>
          <p className="who-i-am-header-text">Who I am</p>
          <p className="who-i-am-text">
            A full stack web developer with a passion for design and dogs
          </p>
        </Bounce>
      </div>
      <div className="about-info-container">
        <div className="about-blurb-container">
          <div className="about-icon">
            <span
              className="icon-vector"
              class="iconify"
              data-icon="gridicons-code"
              data-inline="false"
            ></span>
          </div>
          <div className="about-header">HEADER SENTENCE</div>
          <div className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius urna
            enim eu commodo.
          </div>
        </div>
        <div className="about-blurb-container">
          <div className="about-icon">
            <span
              class="iconify"
              data-icon="icomoon-free:stack"
              data-inline="false"
            ></span>
          </div>
          <div className="about-header">HEADER SENTENCE</div>
          <div className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius urna
            enim eu commodo.
          </div>
        </div>
        <div className="about-blurb-container">
          <div className="about-icon">
            <span
              class="iconify"
              data-icon="el:group"
              data-inline="false"
            ></span>
          </div>
          <div className="about-header">HEADER SENTENCE</div>
          <div className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius urna
            enim eu commodo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
