import React, { useState, useEffect, useLayoutEffect, createRef, useMemo, useRef } from "react";
import "./style.css";
import { data } from "../../data/data";
import { Link, useNavigate } from "react-router-dom";
import useScrollLock from "../../hooks/scrollLock";

function ProjectsMobile({ isCurrent, setIsCurrent,  isPopup, setIsPopup, refs, setRefs, meshes, setMeshes, group, setScale, scaleRef }) {

const requestRef = useRef();
const navigate = useNavigate();
const scrollLock = useScrollLock()

  useEffect(()=>{
    if (isPopup) {
      navigate(`/${data[isCurrent].id}`)
    }
  })

//ON MOUNT FUNCTION
  useEffect(()=>{
    scrollLock.lock()
  
    navigate(`/`)
    setIsPopup(false);
    
    return ()=> scrollLock.unlock()
    },[])

  let objs = Array(data.length).fill({ dist: 0 });

  //Image Distance for MODULE (Was 1.2)
  //Image Distance for MODULE (Was .95, Was 1.15)
  const spaceBetween = 1.35;

  //INERTIA SCROLL
  let speed = 0;
  let position = isCurrent;
  let rounded = 0;

  const Wheel = (e) => {
    // Reduced sensitivity with dampening for slower, more controlled mobile scrolling
    speed += e.deltaY * 0.00018;

    //Add if touch event
  }

  window.addEventListener("wheel", Wheel)

  useLayoutEffect(() => {

  const onScroll = () => {
    // Scroll bounds with resistance - prevents hard stops, adds rubber-band feel
    const minBound = 0;
    const maxBound = data.length - 1;
    const overscrollResistance = 0.15;

    // Apply scroll bounds with soft resistance
    let boundedSpeed = speed;
    if (position < minBound) {
      const overshoot = minBound - position;
      boundedSpeed *= Math.max(0.3, 1 - overshoot * overscrollResistance);
      position += overshoot * 0.05;
    } else if (position > maxBound) {
      const overshoot = position - maxBound;
      boundedSpeed *= Math.max(0.3, 1 - overshoot * overscrollResistance);
      position -= overshoot * 0.05;
    }

    // Apply velocity with smoother deceleration
    position += boundedSpeed;

    // Dampening with friction for controlled, slower motion (was 0.8, then 0.88)
    // Lower value = more friction = slower, more dampened movement
    speed *= 0.85;

    objs.map((el, i) => {
      el.dist = Math.min(Math.abs(position - [data.length - i] + 1), 1);
      el.dist = Math.abs(el.dist);

      // Active card (dist=0) is full size at 1.0, inactive cards (dist=1) are slightly smaller at 0.9
      let scale = Math.abs(1.0 - 0.1 * el.dist);

      let saturation = 1 - 0.8 * el.dist;
      // let opacity = 1 - 0.5 * el.dist;

      let opacity = - .2 *(Math.abs(position - [data.length - i] + 1) * 1.8) + 1

      if (meshes[i].current) {
        meshes[i].current.position.y =
         i + (spaceBetween-1) * spaceBetween  + position - (data.length - 1) * (spaceBetween - (spaceBetween-1)) - (spaceBetween-1);


         // meshes[i].current.position.y = i * spaceBetween  + position - (data.length - 1) * spaceBetween;

         meshes[i].current.position.z = scale *.3


          meshes[i].current.scale.set(scale, scale, scale);

        meshes[i].current.material.uniforms.distanceFromCenter.value = scale;
        meshes[i].current.material.uniforms.saturation.value = saturation;
        meshes[i].current.material.uniforms.opacity.value = opacity;

        scaleRef[i].current = scale;

      }
    });

    rounded = Math.abs(Math.round(position));

    //Safety Nets to Keep In Bounds
    rounded = position > data.length - 1 ? data.length - 1 : rounded;
    rounded = position < 0 ? 0 : rounded;

    let diff = rounded - position;

    // Softer magnetic snapping - only when settling
    const velocityThreshold = 0.001;
    const isSettling = Math.abs(speed) < velocityThreshold;

    if (isSettling) {
      // Very gentle "floating to rest" feeling with slow approach
      // Higher power = slower approach as it gets closer
      // Lower strength multiplier = slower overall pull
      position += Math.sign(diff) * Math.pow(Math.abs(diff), 1.2) * 0.022;
    }

    setIsCurrent(rounded);

    requestRef.current = requestAnimationFrame(onScroll)
  };

  if (meshes[data.length - 1] !== undefined) {
    requestRef.current = requestAnimationFrame(onScroll);
  }
 
    return () => {
      cancelAnimationFrame(requestRef.current)
      window.removeEventListener("wheel", Wheel)
    }
  }, [meshes]);

  return (
    <div id="projects">
      
    </div>
  );
}

export default ProjectsMobile;
