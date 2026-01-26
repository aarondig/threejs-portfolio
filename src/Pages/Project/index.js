import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { data } from "../../data/data";
import useWindowSize from "../../hooks/windowSize";
import Image from "../../components/Sections/Image/index";
import "./style.css";
import Article from "../../components/Sections/Article";
import useScrollLock from "../../hooks/scrollLock";
import Tech from "../../components/Sections/Tech";
import Slideshow from "../../components/Sections/Slideshow";
import Gallery from "../../components/Sections/Gallery";
import Hero from "../../components/ProjectPage/Hero";
import Wrapper from "../../components/ProjectPage/Wrapper";
import Overview from "../../components/ProjectPage/Overview";
import Footer from "../../components/ProjectPage/Footer";
import ContentSection from "../../components/ProjectPage/ContentSection";

function Project({ isCurrent }) {
  const size = useWindowSize();
  const scrollLock = useScrollLock();
  const scroller = useRef();

  const requestRef = useRef();

  const project = data[isCurrent];
  const useDesignSystem = project.useDesignSystem;

  




  let ease = 0.1;
  let current = 0;
  let previous = 0;
  let rounded = 0;

  useEffect(() => {
    document.body.style.height = `${
      scroller.current.getBoundingClientRect().height + size.height
    }px`;
  }, [size.height]);




  // SCROLLING
  useLayoutEffect(() => {
    const skewScrolling = () => {
      //Set Current to the scroll position amount
      current = window.scrollY;
      // Set Previous to the scroll previous position
      previous += (current - previous) * ease;
      // Set rounded to
      rounded = Math.round(previous * 100) / 100;

      //VARIABLES
      const difference = current - rounded;
      const acceleration = difference / size.width;
      const velocity = +acceleration;
      const skew = velocity * 7.5;

      //Assign skew and smooth scrolling to the scroll container
      // scroller.current.style.transform = `translate3d(0, -${rounded}px, 0) skewY(${skew}deg)`;

      //No Skew with React Three Fiber Canvas... It extends page.
      scroller.current.style.transform = `translate3d(0, -${rounded}px, 0)`;
      // skewY(${skew}deg)

      requestRef.current = requestAnimationFrame(skewScrolling);
    };

    window.scrollTo(0, 0);

    requestRef.current = requestAnimationFrame(skewScrolling);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  
  // Render with design system if enabled
  if (useDesignSystem) {
    return (
      <div id="project" className="project-page-sds">
        <div className="scroller" ref={scroller}>
          <Wrapper>
            <Overview
              description={project.overview?.description}
              aboutRailsr={project.overview?.aboutRailsr}
              problem={project.overview?.problem}
              metadata={project.overview?.metadata}
              prototypeUrl={project.overview?.prototypeUrl}
            />

            {project.sections.map((el, i) => (
              <ContentSection
                key={i}
                section={el}
                isCurrent={isCurrent}
                size={size}
              />
            ))}
          </Wrapper>

          <Footer />
        </div>
      </div>
    );
  }

  // Legacy rendering for existing projects
  return (
    <div id="project">
      <div className="scroller" ref={scroller}>
        <div className="text-wrap">
          <div className="section">
            <h4 className="subtitle">About This Project</h4>
            <h1 className="title">{project.tagline}</h1>
            {/* <div className="row"> */}
            <div className="description-c">
            {project.about.map((el, i)=>{
              return (
              <p className="description" key={i}>{project.about[i]}</p>
              )
            })}
            </div>

            <div className="details">
              <div className="detail">
                <p className="label">Role</p>
                <p className="text">{project.role}</p>
              </div>
              <div className="detail">
                <p className="label">Client</p>
                <p className="text">{project.client}</p>
              </div>
              <div className="detail">
                <p className="label">Date</p>
                <p className="text">{project.date}</p>
              </div>
            </div>
            {/* </div> */}


          </div>

          {project.sections.map((el, i) => {
            switch (el.type) {
              default: {
                return (
                  <div className="section" key={i}>
                    <h1 className="title">{el.header}</h1>
                    {/* <div className="row"> */}
                    <p className="description">{el.body}</p>
                  </div>
                );
              }
              case "article": {
                return (
                  <div className="section" key={i}>
                    <Article el={el} isCurrent={isCurrent}/>
                  </div>
                );
              }
              case "image": {
                return (
                  <div className="section" key={i}>
                    <Image el={el} isCurrent={isCurrent} />
                  </div>
                );
              }
              case "tech": {
                return (
                  <div className="section" key={i}>
                    <Tech el={el} isCurrent={isCurrent}/>
                  </div>
                );
              }
              case "slideshow": {
                return (
                  <div className="section" key={i}>
                    <Slideshow el={el} isCurrent={isCurrent}/>
                  </div>
                );
              }
              case "gallery": {

                return (
                  <div className="section" key={i}>
                    <Gallery el={el} isCurrent={isCurrent} size={size}/>
                  </div>
                );
              }
            }
          })}

        </div>
      </div>
    </div>
  );
}

function ProjectLoader({isCurrent}) {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setCounter(counter + 1), 10);
    }
    if (counter >= 99) {
      setLoading(false);
    }
  }, [counter]);

  const projectProps = {
    isCurrent: isCurrent,
  };

  // let radius = 40;
  let radius = 30;
 
  let stroke = 2;
  let progress = counter;

  let normalizedRadius = radius - stroke * 2;

  let circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className="loader-c">
        <svg className="loader-svg" height={radius * 2} width={radius * 2}>
          <circle
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
         
        </svg>
        {/* height={radius/.75} width={radius/.75} */}
        <svg className="checkmark-svg" height={radius/.58} width={radius/.58}>
        {!loading && <path className="checkmark-svg" stroke="white" fill="none" strokeWidth={stroke} strokeDasharray={10} d="M14.1 27.2l7.1 7.2 16.7-16.8"/>}
          
         
          </svg>
      </div>
      {loading ? <></> : <Project {...projectProps} />}
    </>
  );
}
export default ProjectLoader;
