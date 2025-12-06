import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { data } from "../../data/data";

function ProjectNavigationDots({ isCurrent, setIsCurrent, setAttractTo, attractMode, attractTo, setIsPopup }) {
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDotClick = (index) => {
    // Navigate to the selected project
    setIsCurrent(index);
    // Also set attract mode for smooth transition
    setAttractTo(index);
    // Close the popup/active state by navigating to projects page
    navigate(`/projects/`);
    setIsPopup(false);
  };

  const handleDotEnter = (index) => {
    setAttractTo(index);
  };

  const handleContainerEnter = () => {
    setIsContainerHovered(true);
  };

  const handleContainerLeave = () => {
    setIsContainerHovered(false);
    setAttractTo(null);
  };

  return (
    <div
      className={`project-navigation-dots ${isContainerHovered ? 'container-hovered' : ''}`}
      onMouseEnter={handleContainerEnter}
      onMouseLeave={handleContainerLeave}
    >
      {data.map((project, index) => {
        const isActive = index === isCurrent;
        const isDotHovered = attractMode && attractTo === index;

        return (
          <div
            key={project.id}
            className={`nav-dot ${isActive ? "active" : ""} ${isDotHovered ? "hovered" : ""}`}
            onClick={() => handleDotClick(index)}
            onMouseEnter={() => handleDotEnter(index)}
          >
            <div className="nav-dot-label">{project.title}</div>
            <div
              className="nav-dot-indicator"
              style={{
                backgroundColor: isActive ? project.background : undefined
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProjectNavigationDots;
