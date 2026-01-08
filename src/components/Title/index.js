import React, { useState, useEffect, useRef } from "react";
import { a, useSpring, useSprings, useTransition } from "react-spring";
import { data } from "../../data/data";
import useWindowSize from "../../hooks/windowSize";
import "./style.css";

function Header({
  isCurrent,
  isPopup,
  handleClick,
  el,
  i,
  springs,
  btnHover,
  setBtnHover,
  size,
}) {
  //  const disappearBox = useRef();
  // const [moveDown, setMoveDown] = useState();
  // useEffect(() => {
  //   setMoveDown(disappearBox.current.getBoundingClientRect().height);
  // }, [size.height]);

  // const slide = moveDown / 2;

  const disappear = useSpring({
    // transform: isPopup ? `translateY(${moveDown}px)` : `translateY(-0px)`,
    transform: isPopup ? `translateY(${50}px)` : `translateY(0px)`,
    opacity: isPopup ? 0 : 1,

    config: { duration: 200 },
  });
  // const slideDown = useSpring({
  //   from: {
  //     transform: "translateY(0px)",

  //   },
  //   to: {
  //     // transform: isPopup ? `translateY(${slide}px)` : `translateY(-0px)`,

  //   },
  // })

  //   const btnStyle = useSpring({

  //     borderColor: !btnHover ? el.background : "transparent",
  //       background: btnHover ? el.background : "transparent",

  //       config:{duration: 200}

  //   })
  //   const btnText = useSpring({
  //     color: !btnHover ? el.background : "white",
  //  config:{duration: 200}
  //     })

  return (
    <a.div className="title-c" style={springs[i]} key={i}>
      <div className="text-wrapper">
        <a.h1 className="title" style={disappear}>
          {el.title}
        </a.h1>
        <a.h3 className="subtitle" style={disappear}>
          {el.description}
        </a.h3>
      </div>
      <div
        className="open-case-study-btn"
        onClick={() => handleClick()}
        style={disappear}
      >
        <span>Open Case Study</span>
        <div className="arrow-icon">
          <img src="/assets/arrow-icon.svg" alt="Arrow" />
        </div>
      </div>
    </a.div>
  );
}

function Title({ isCurrent, isPopup, handleClick, size, attractMode }) {
  //ANIMATIONS

  const springs = useSprings(
    data.length,
    data.map((el, i) => ({
      from: {
        opacity: 0,
      },
      to: {
        transform: isPopup || attractMode ? `translate3d(0, 50px, 0)` : `translate3d(0, 0, 0)`,
        opacity: isPopup || attractMode ? 0 : i === isCurrent ? 1 : 0,
      },
      config: {
        tension: 280,
        friction: 60,
      },
      immediate: isPopup || attractMode,
    }))
  );

  const appear = useSpring({
    opacity: !isPopup ? 0 : 1,
    y: !isPopup ? 50 : 0,
    delay: 400,
    config: { tension: 280, friction: 60 },
  });

  const { opacity } = useSpring({
    opacity: isPopup ? 0 : 1,
  });

  const [btnHover, setBtnHover] = useState(false);

  const headerProps = {
    isCurrent: isCurrent,
    isPopup: isPopup,
    handleClick: handleClick,
    springs: springs,
    btnHover: btnHover,
    setBtnHover: setBtnHover,
    size: size,
  };

  const titleStyle = useSpring({
    opacity: attractMode ? 0 : 1,
    pointerEvents: attractMode ? 'none' : 'all',
    config: { duration: 300 }
  });

  return (
    <a.div id="title" style={titleStyle}>
      <div className="title-section">
        <div className="main-content">
          <div className="title-content-wrapper">
            {data.map((el, i) => {
              return <Header el={el} i={i} key={i} {...headerProps} />;
            })}
          </div>
        </div>

        {!isPopup && !attractMode && (
          <div className="bottom-section">
            <div className="preview-box">
              {data[isCurrent].banner && (
                <img src={data[isCurrent].banner} alt={data[isCurrent].title} />
              )}
            </div>
            <a
              href="https://aarondig.com"
              className="grid-button"
              aria-label="View all projects"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4.33" cy="4.33" r="1.08" />
                <circle cx="11.92" cy="4.33" r="1.08" />
                <circle cx="19.5" cy="4.33" r="1.08" />
                <circle cx="4.33" cy="11.92" r="1.08" />
                <circle cx="11.92" cy="11.92" r="1.08" />
                <circle cx="19.5" cy="11.92" r="1.08" />
                <circle cx="4.33" cy="19.5" r="1.08" />
                <circle cx="11.92" cy="19.5" r="1.08" />
                <circle cx="19.5" cy="19.5" r="1.08" />
              </svg>
            </a>
          </div>
        )}

        {isPopup && (
          <a.h1
            className="big-title"
            style={{
              opacity: appear.opacity,
              transform: appear.y.to(y => `translate3d(0, calc(-50% + ${y}px), 0)`)
            }}
          >
            {data[isCurrent].title}
          </a.h1>
        )}
      </div>
    </a.div>
  );
}

export default Title;
