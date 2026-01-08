import React from "react";
import "./style.css";

function Grid({ el }) {
  return (
    <div className="sds-grid-section">
      <div className="sds-image-grid">
        {el.images && el.images.map((image, i) => (
          <div key={i} className="sds-image-grid__item">
            <img src={image.src} alt={image.caption || `Image ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
