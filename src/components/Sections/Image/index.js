import React from "react";
import "./style.css";

function Image({ el, isCurrent }) {
  return (
    <div id="image">
      <div className="image-container">
        <img
          src={el.src}
          alt={el.caption || ""}
          className="project-image"
        />
      </div>
      <div className="caption-c">
        <p className="caption">{el.caption}</p>
      </div>
    </div>
  );
}

export default Image;
