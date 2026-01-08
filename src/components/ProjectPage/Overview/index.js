import React from "react";

function Overview({ description, aboutRailsr, problem, metadata, prototypeUrl }) {
  return (
    <div className="sds-overview">
      <div className="sds-overview__main">
        <div className="sds-overview__text-block">
          <p className="sds-overview__label">Overview</p>
          <p className="sds-overview__description">{description}</p>
        </div>

        {(aboutRailsr || problem) && (
          <div className="sds-overview__row">
            {aboutRailsr && (
              <div className="sds-overview__text-item">
                <p className="sds-overview__text-item-title">About Railsr</p>
                <p className="sds-overview__text-item-body">{aboutRailsr}</p>
              </div>
            )}
            {problem && (
              <div className="sds-overview__text-item">
                <p className="sds-overview__text-item-title">Problem</p>
                <p className="sds-overview__text-item-body">{problem}</p>
              </div>
            )}
          </div>
        )}

        {prototypeUrl && (
          <div className="sds-overview__row">
            <a href={prototypeUrl} target="_blank" rel="noopener noreferrer">
              <button className="sds-button">View Prototype</button>
            </a>
          </div>
        )}
      </div>

      {metadata && (
        <div className="sds-overview__sidebar">
          {metadata.role && (
            <div className="sds-overview__meta-item">
              <p className="sds-overview__meta-label">Role</p>
              <p className="sds-overview__meta-value">{metadata.role}</p>
            </div>
          )}
          {metadata.company && (
            <div className="sds-overview__meta-item">
              <p className="sds-overview__meta-label">Company</p>
              <p className="sds-overview__meta-value">{metadata.company}</p>
            </div>
          )}
          {metadata.tools && (
            <div className="sds-overview__meta-item">
              <p className="sds-overview__meta-label">Tools</p>
              <p className="sds-overview__meta-value">{metadata.tools}</p>
            </div>
          )}
          {metadata.team && (
            <div className="sds-overview__meta-item">
              <p className="sds-overview__meta-label">Team</p>
              <p className="sds-overview__meta-value">{metadata.team}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Overview;
