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
      {/* <a.h1 className="title" style={slideDown}>{el.title}</a.h1> */}
      <a.h1 className="title" style={disappear}>
        {el.title}
      </a.h1>
      {/* <a.div className="disappearBox" ref={disappearBox} style={disappear}> */}
      <a.div className="disappearBox" style={disappear}>
        <a.h3 className="subtitle">{el.description}</a.h3>
      </a.div>

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
        <div className="title-and-nav">
          <div className="title-content">
            {data.map((el, i) => {
              return <Header el={el} i={i} key={i} {...headerProps} />;
            })}
          </div>
        </div>

        {!isPopup && !attractMode && (
          <div className="preview-box">
            {data[isCurrent].banner && (
              <img src={data[isCurrent].banner} alt={data[isCurrent].title} />
            )}
          </div>
        )}
      </div>

      {isPopup ? (
        <a.h1
          className="big-title"
          style={{
            opacity: appear.opacity,
            transform: appear.y.to(y => `translate3d(0, calc(-50% + ${y}px), 0)`)
          }}
        >
          {data[isCurrent].title}
        </a.h1>
      ) : (
        <></>
      )}
    </a.div>
  );
}

export default Title;
