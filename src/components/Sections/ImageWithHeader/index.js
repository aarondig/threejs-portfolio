import React from "react";
import "./style.css";

function ImageWithHeader({ el }) {
  return (
    <div className="sds-image-with-header-section">
      {/* Title Block */}
      <div className="sds-image-header-row">
        <div className="sds-image-header-text">
          <p className="sds-image-header-label">{el.title}</p>
          <p className="sds-image-header-subtitle">{el.subtitle}</p>
        </div>

        {el.showIcon && (
          <div className="sds-image-header-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="29.25" stroke="#E5E5E5" strokeWidth="1.5" fill="none"/>
              <line x1="30" y1="18" x2="30" y2="42" stroke="#646464" strokeWidth="1.5" strokeLinecap="round"/>
              <polyline points="22,34 30,42 38,34" fill="none" stroke="#646464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div
        className="sds-image-grid"
        style={{
          gridTemplateColumns: `repeat(${el.columns || 2}, 1fr)`
        }}
      >
        {el.images && el.images.map((image, i) => (
          <div key={i} className="sds-image-grid-item">
            <img
              src={image.src}
              alt={image.caption || `Image ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageWithHeader;
