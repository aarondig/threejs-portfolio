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

  // Track target position for external navigation (e.g., clicking a mesh)
  const targetPositionRef = useRef(null);

  // Detect when isCurrent changes externally (e.g., from mesh click)
  useEffect(() => {
    const currentRounded = Math.round(positionRef.current);
    // If isCurrent changed but doesn't match our current scroll position
    if (isCurrent !== currentRounded && targetPositionRef.current !== isCurrent) {
      // Set target to trigger smooth scroll in animation loop
      targetPositionRef.current = isCurrent;
    }
  }, [isCurrent]);

  // Use custom hook for viewport-normalized scroll sensitivity
  // Reduced sensitivity for smoother, more controlled scrolling with dampening
  // Lower value = slower response = easier to control across all input devices
  const scrollSensitivityRef = useScrollSensitivity(0.00018, 1920);

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

  // Image Distance for MODULE (Was 1.2, Was .95, Was 1.40)
  // Adjusted spacing to add more gap between cards
  const spaceBetween = 1.70;

  // Memoized wheel handler to prevent recreation
  const handleWheel = useCallback((e) => {
    speedRef.current += e.deltaY * scrollSensitivityRef.current;
  }, []);

  useLayoutEffect(() => {
    // Add wheel event listener
    window.addEventListener("wheel", handleWheel);

    const onScroll = () => {
      // Scroll bounds with resistance - prevents hard stops, adds rubber-band feel
      const minBound = 0;
      const maxBound = data.length - 1;
      const overscrollResistance = 0.15; // How much resistance at bounds

      // Apply scroll bounds with soft resistance
      let boundedSpeed = speedRef.current;
      if (positionRef.current < minBound) {
        // Approaching/past lower bound - add resistance
        const overshoot = minBound - positionRef.current;
        boundedSpeed *= Math.max(0.3, 1 - overshoot * overscrollResistance);
        // Gentle pull back towards bound
        positionRef.current += overshoot * 0.05;
      } else if (positionRef.current > maxBound) {
        // Approaching/past upper bound - add resistance
        const overshoot = positionRef.current - maxBound;
        boundedSpeed *= Math.max(0.3, 1 - overshoot * overscrollResistance);
        // Gentle pull back towards bound
        positionRef.current -= overshoot * 0.05;
      }

      // Apply velocity with smoother deceleration
      positionRef.current += boundedSpeed;

      // Dampening with friction for controlled, slower motion (was 0.85, then 0.90)
      // Lower value = more friction = slower, more dampened movement
      speedRef.current *= 0.87;

      // Update all mesh transforms based on position
      objs.forEach((obj, i) => {
        // Calculate distance from current position (normalized 0-1)
        const rawDist = Math.abs(positionRef.current - (data.length - i - 1));
        obj.dist = Math.min(rawDist, 1);

        // Calculate visual properties based on distance
        // In attract mode, all cards are same scale (1.0) for layered depth effect
        // Otherwise: Active card (dist=0) is full size at 1.0, inactive cards (dist=1) are slightly smaller at 0.9
        const scale = attractMode ? .95 : (1.0 - 0.1 * obj.dist);
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
        // Smooth interpolation for navigation dot interaction
        positionRef.current += -(positionRef.current - attractTo) * 0.08;
      } else if (targetPositionRef.current !== null) {
        // Smooth interpolation when navigating to a clicked mesh
        positionRef.current += -(positionRef.current - targetPositionRef.current) * 0.08;

        // Clear target when we're close enough
        if (Math.abs(positionRef.current - targetPositionRef.current) < 0.01) {
          targetPositionRef.current = null;
        }
      } else {
        // Softer magnetic snapping - more interpretive, less aggressive
        // Only apply when velocity is low (user has stopped scrolling)
        const velocityThreshold = 0.001;
        const isSettling = Math.abs(speedRef.current) < velocityThreshold;

        if (isSettling) {
          // Very gentle "floating to rest" feeling with slow approach
          // Higher power = slower approach as it gets closer
          // Lower strength multiplier = slower overall pull
          const snapStrength = Math.pow(Math.abs(diff), 1.2) * 0.025;
          positionRef.current += Math.sign(diff) * snapStrength;
        }
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
