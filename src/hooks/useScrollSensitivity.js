import { useRef, useEffect, useCallback } from "react";

/**
 * Custom hook to calculate viewport-normalized scroll sensitivity
 * Ensures scroll feels consistent across all screen sizes
 *
 * @param {number} baseSensitivity - Base scroll sensitivity value (default: 0.0003)
 * @param {number} referenceWidth - Reference screen width for normalization (default: 1920)
 * @returns {React.MutableRefObject} - Ref containing current scroll sensitivity
 */
export default function useScrollSensitivity(
  baseSensitivity = 0.0003,
  referenceWidth = 1920
) {
  const sensitivityRef = useRef(baseSensitivity);

  const calculateSensitivity = useCallback(() => {
    const currentWidth = window.innerWidth;
    const scaleFactor = currentWidth / referenceWidth;

    // Normalize: smaller screens get higher sensitivity to maintain same scroll "feel"
    // This ensures that scrolling 100px on a 1920px screen feels the same as
    // scrolling proportionally on a smaller screen
    sensitivityRef.current = baseSensitivity / scaleFactor;
  }, [baseSensitivity, referenceWidth]);

  useEffect(() => {
    // Initial calculation
    calculateSensitivity();

    // Recalculate on window resize with debouncing
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateSensitivity, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateSensitivity]);

  return sensitivityRef;
}
