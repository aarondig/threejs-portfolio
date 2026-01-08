import React from "react";
import Article from "../../Sections/Article";
import Gallery from "../../Sections/Gallery";
import Slideshow from "../../Sections/Slideshow";
import Image from "../../Sections/Image";
import Tech from "../../Sections/Tech";
import Outcomes from "../../Sections/Outcomes";
import Grid from "../../Sections/Grid";
import ImageWithHeader from "../../Sections/ImageWithHeader";
import ProcessList from "../../Sections/ProcessList";

function ContentSection({ section, isCurrent, size }) {
  const renderSection = () => {
    switch (section.type) {
      case "article":
        return <Article el={section} isCurrent={isCurrent} />;
      case "gallery":
        return <Gallery el={section} isCurrent={isCurrent} size={size} />;
      case "slideshow":
        return <Slideshow el={section} isCurrent={isCurrent} />;
      case "image":
        return (
          <div className="sds-image-section">
            <div className="sds-image-section__image">
              <img src={section.src} alt={section.caption || "Section image"} />
            </div>
          </div>
        );
      case "tech":
        return <Tech el={section} isCurrent={isCurrent} />;
      case "outcomes":
        return <Outcomes el={section} isCurrent={isCurrent} />;
      case "grid":
        return <Grid el={section} isCurrent={isCurrent} />;
      case "imagewithheader":
        return <ImageWithHeader el={section} isCurrent={isCurrent} />;
      case "processlist":
        return <ProcessList el={section} isCurrent={isCurrent} />;
      default:
        return (
          <div className="section">
            <h1 className="title">{section.header}</h1>
            <p className="description">{section.body}</p>
          </div>
        );
    }
  };

  return (
    <div className="sds-content-section">
      {renderSection()}
    </div>
  );
}

export default ContentSection;
