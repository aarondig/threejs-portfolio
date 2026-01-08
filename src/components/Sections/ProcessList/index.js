import React from "react";
import "./style.css";

function ProcessList({ el }) {
  return (
    <div className="sds-process-section">
      {/* Left Column: Text and List */}
      <div className="sds-process-block">
        <div className="sds-process-text">
          <p className="sds-process-label">{el.title}</p>
          <p className="sds-process-description">{el.description}</p>
        </div>

        <div className="sds-process-list">
          {el.items && el.items.map((item, i) => (
            <div key={i} className="sds-process-item">
              {/* Icon */}
              <div className="sds-process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Different icons based on item.icon prop */}
                  {item.icon === "palette" && (
                    <>
                      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" strokeWidth={2}/>
                      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" strokeWidth={2}/>
                      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" strokeWidth={2}/>
                      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C12.926 22 13.648 21.254 13.648 20.312C13.648 19.875 13.468 19.477 13.211 19.187C12.921 18.898 12.773 18.535 12.773 18.062C12.7692 17.8419 12.8098 17.6233 12.8922 17.4192C12.9747 17.2151 13.0975 17.0298 13.2531 16.8741C13.4088 16.7185 13.5941 16.5957 13.7982 16.5132C14.0023 16.4308 14.2209 16.3902 14.441 16.394H16.437C19.488 16.394 21.992 13.891 21.992 10.84C21.965 6.012 17.461 2 12 2Z"/>
                    </>
                  )}
                  {item.icon === "type" && (
                    <path d="M4 7V4H20V7M9 20H15M12 4V20"/>
                  )}
                  {item.icon === "paintbrush" && (
                    <path d="M3 22L10.88 8.88M19 13C15.13 17 8.87 17 5 13M15 5C15 6.66 13.66 8 12 8C10.34 8 9 6.66 9 5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5Z"/>
                  )}
                  {item.icon === "credit-card" && (
                    <path d="M2 9H22M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z"/>
                  )}
                  {item.icon === "moon" && (
                    <>
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <circle cx="12" cy="12" r="10"/>
                    </>
                  )}
                </svg>
              </div>

              <p className="sds-process-item-title">{item.title}</p>
              <p className="sds-process-item-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Images */}
      <div className="sds-process-images">
        {el.images && el.images.map((image, i) => (
          <div key={i} className="sds-process-image">
            <img
              src={image.src}
              alt={image.caption || `Process image ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcessList;
