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
          <div className="about-header">Diverse Skillset</div>
          <div className="about-text">
            I'm a passionate full stack developer and web designer. I love
            building responsive, clean and user friendly web apps.
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
          <div className="about-header">My Stack</div>
          <div className="about-text">
            I'm proficient in React, Express and Ruby on Rails. I've built and
            queried tons of RESTful APIs. I've built User Authentication from
            scratch.
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
          <div className="about-header">Teamwork</div>
          <div className="about-text">
            I love opportunities to work with and learn from other developers.
            I've worked in Agile environments.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
