import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="projects-header">PROJECTS</div>
      <div className="project-image-container">
        <a href="http://beer-app.surge.sh/">
          <div className="project-image1">
            <div className="project-info">
              <p className="project-title">Beer-O-Meter</p>
              <p className="project-details">
                A CRUD app to save and rate the beers you try
              </p>
              <p className="project-tech">Built with React on Rails</p>
            </div>
          </div>
        </a>
        <a href="https://venu-app-v2.herokuapp.com/">
          <div className="project-image2">
            <div className="project-info">
              <p className="project-title">Venu</p>
              <p className="project-details">
                A CRUD app that aggregates ratings of restaurants and bars
              </p>
              <p className="project-tech">Built with React and express</p>
            </div>
          </div>
        </a>{" "}
        <a href="http://fantasytranslator.surge.sh/">
          <div className="project-image3">
            <div className="project-info">
              <p className="project-title">Fantasy Translator</p>
              <p className="project-details">
                A translation app that interfaces with an API to translate to 4
                fantasy languages
              </p>
              <p className="project-tech">Built with React</p>
            </div>
          </div>
        </a>{" "}
        <a href="https://c-kehler.github.io/leap-the-gap/">
          <div className="project-image4">
            <div className="project-info">
              <p className="project-title">Leap The Gap</p>
              <p className="project-details">
                A canvas based Javascript platformer
              </p>
              <p className="project-tech">Built with Javascript</p>
            </div>
          </div>
        </a>{" "}
        <a href="http://beer-app.surge.sh/">
          <div className="project-image5">
            <div className="project-info">
              <p className="project-title">Coming Soon!</p>
              <p className="project-details"></p>
              <p className="project-tech"></p>
            </div>
          </div>
        </a>{" "}
        <a href="http://beer-app.surge.sh/">
          <div className="project-image6">
            <div className="project-info">
              <p className="project-title">Coming Soon!</p>
              <p className="project-details"></p>
              <p className="project-tech"></p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Projects;
