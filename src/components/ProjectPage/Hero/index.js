import React from "react";
import { useNavigate } from "react-router-dom";

function Hero({ title, banner, onBackClick, onMenuClick }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate("/projects");
    }
  };

  return (
    <div className="sds-hero">
      {banner && (
        <img
          src={banner}
          alt={title}
          className="sds-hero__banner"
        />
      )}

      <div className="sds-hero__body">
        <div className="sds-hero__nav">
          <button
            className="sds-hero__back-button"
            onClick={handleBackClick}
            aria-label="Back to projects"
          >
            <div className="sds-hero__back-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4.375L5 10L10 15.625"
                  stroke="#e5e5e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="sds-hero__back-text">Back Home</span>
          </button>

          {onMenuClick && (
            <button
              className="sds-hero__menu"
              onClick={onMenuClick}
              aria-label="Menu"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10H26M6 16H26M6 22H26"
                  stroke="#e5e5e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="sds-hero__content">
          <h1 className="sds-hero__title">{title}</h1>
        </div>

        <div className="sds-hero__footer">
          <div className="sds-hero__scroll-icon">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30"
                cy="30"
                r="29"
                stroke="#404040"
                strokeWidth="2"
              />
              <path
                d="M30 20V40M30 40L24 34M30 40L36 34"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
