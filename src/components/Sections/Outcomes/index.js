import React from "react";
import "./style.css";

function Outcomes({ el }) {
  return (
    <div className="sds-outcomes-section">
      <div className="sds-outcomes-block">
        <div className="sds-outcomes-text-block">
          <p className="sds-outcomes-label">{el.title || "Outcomes"}</p>
          <p className="sds-outcomes-description">{el.description}</p>
        </div>

        <div className="sds-outcomes-list">
          {el.outcomes && el.outcomes.map((outcome, i) => (
            <div key={i} className="sds-outcomes-item">
              <div className="sds-outcomes-icon">
                {outcome.icon === "user" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"/>
                  </svg>
                )}
                {outcome.icon === "maximize" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14"/>
                  </svg>
                )}
                {outcome.icon === "trending-up" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12"/>
                  </svg>
                )}
              </div>
              <p className="sds-outcomes-item-title">{outcome.title}</p>
              <p className="sds-outcomes-item-description">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>

      {el.image && (
        <div className="sds-outcomes-image-block">
          <div className="sds-outcomes-image">
            <img src={el.image} alt="Outcomes visualization" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Outcomes;
