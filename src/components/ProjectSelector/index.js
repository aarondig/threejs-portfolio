import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import "./style.css";
import { data } from "../../data/data";
import useScrollLock from "../../hooks/scrollLock";
import useScrollSensitivity from "../../hooks/useScrollSensitivity";
import ProjectNavigationDots from "../ProjectNavigationDots";

function ProjectSelector({
  isCurrent,
  setIsCurrent,
  isPopup,
  setIsPopup,
  basename,
  meshes,
  setMeshes,
  group,
  setScale,
  scaleRef,
  setAttractMode,
}) {
  const requestRef = useRef();
  const scrollLock = useScrollLock();

  // Attract mode state for navigation hover
  const [attractTo, setAttractTo] = useState(null);
  const attractMode = attractTo !== null;

  // Update global attract mode state when local state changes
  useEffect(() => {
    setAttractMode(attractMode);
  }, [attractMode, setAttractMode]);

  // Physics state refs (persistent across renders)
  const speedRef = useRef(0);
  const positionRef = useRef(isCurrent);

  // Use custom hook for viewport-normalized scroll sensitivity
  // Increased from 0.0003 to 0.00045 for less inertia required (50% more sensitive)
  const scrollSensitivityRef = useScrollSensitivity(0.0003, 1920);

  // ON MOUNT FUNCTION
  useEffect(() => {
    scrollLock.lock();
    setIsPopup(false);
    return () => scrollLock.unlock();
  }, [scrollLock, setIsPopup]);

  // Memoize objects array to prevent recreation every frame
  const objs = useMemo(
    () => Array(data.length).fill(null).map(() => ({ dist: 0 })),
    []
  );

  // Image Distance for MODULE (Was 1.2, Was .95)
  // Tighter spacing to match reference with overlapping cards
  const spaceBetween = 1.40;

  // Memoized wheel handler to prevent recreation
  const handleWheel = useCallback((e) => {
    speedRef.current += e.deltaY * scrollSensitivityRef.current;
  }, []);

  useLayoutEffect(() => {
    // Add wheel event listener
    window.addEventListener("wheel", handleWheel);

    const onScroll = () => {
      // Use refs for physics values to maintain state across frames
      positionRef.current += speedRef.current;
      speedRef.current *= 0.85; // Reduced friction (was 0.8) - less sticky, smoother glide

      // Update all mesh transforms based on position
      objs.forEach((obj, i) => {
        // Calculate distance from current position (normalized 0-1)
        const rawDist = Math.abs(positionRef.current - (data.length - i - 1));
        obj.dist = Math.min(rawDist, 1);

        // Calculate visual properties based on distance
        const scale = 1 - 0.2 * obj.dist;
        const saturation = 1 - 0.8 * obj.dist;
        const opacity = 1 - 0.6 * obj.dist;

        const mesh = meshes[i]?.current;
        if (mesh) {
          // Center the active item vertically at Y=0
          // Negate to maintain original scroll direction (scroll down = cards move up)
          const itemIndex = data.length - i - 1;
          mesh.position.y = (positionRef.current - itemIndex) * spaceBetween;

          // Batch uniform updates for better performance
          mesh.scale.set(scale, scale, scale);
          const uniforms = mesh.material.uniforms;
          uniforms.distanceFromCenter.value = scale;
          uniforms.saturation.value = saturation;
          uniforms.opacity.value = opacity;

          scaleRef[i].current = scale;
        }
      });

      // Snap to nearest position with magnetic effect
      const rounded = Math.max(0, Math.min(data.length - 1, Math.round(positionRef.current)));
      const diff = rounded - positionRef.current;

      // Attract mode: pull towards hovered navigation dot
      if (attractMode) {
        positionRef.current += -(positionRef.current - attractTo) * 0.07;
      } else {
        // Magnetic snapping: smoother easing towards rounded position
        positionRef.current += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.06;
      }

      setIsCurrent(rounded);

      requestRef.current = requestAnimationFrame(onScroll);
    };

    // Start animation loop when meshes are ready
    if (meshes[data.length - 1]?.current) {
      requestRef.current = requestAnimationFrame(onScroll);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [meshes, handleWheel, objs, scaleRef, attractMode, attractTo]);

  return (
    <div id="projectSelector">
      <ProjectNavigationDots
        isCurrent={isCurrent}
        setIsCurrent={setIsCurrent}
        setAttractTo={setAttractTo}
        attractMode={attractMode}
        attractTo={attractTo}
        setIsPopup={setIsPopup}
      />
    </div>
  );
}

export default ProjectSelector;
