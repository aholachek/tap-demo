import React from "react";

/**
 * A hook to toggle a class on a tappable element that replaces the :active CSS pseudoclass for a nicer UI experience
 *
 * @param {Object} options
 * @param {number} options.delay - Don't show a tap highlight right away to prevent inadvertant triggering (e.g. on scroll)
 * @param {string} options.tapClass - The name of the class to toggle
 * @param {boolean} options.preventDefault - since this hook works by delaying the onClick event until the next frame,
 * we need to specify if we should call event.preventDefault(), since it must be called immediately
 * @param {onClick} this is the onClick function that we will wrap in order to show the optimum tap highlighting experience
 */
export default function useTappable({
  delay = 75,
  tapClass = "tapActive",
  preventDefault = false,
  onClick,
} = {}) {
  const timeoutRef = React.useRef();
  const isTouchDeviceRef = React.useRef(false);

  const onTouchStart = (e) => {
    isTouchDeviceRef.current = true;
    const cachedTarget = e.currentTarget;
    timeoutRef.current = setTimeout(() => {
      cachedTarget.classList.add(tapClass);
    }, delay);
  };

  const onTouchMove = (e) => {
    // once this is triggered, we're not going to treat it as a tap anymore
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    e.currentTarget.classList.remove(tapClass);
  };

  const wrappedOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    // it's not a touchscreen device, just call the onclick function
    if (!isTouchDeviceRef.current) return onClick(e);

    e.persist();
    const cachedTarget = e.currentTarget;

    const isClick = Boolean(timeoutRef.current);
    if (!isClick) return;

    requestAnimationFrame(() => {
      // make sure the item will be highlighted if the UI blocks, even if the tap finished within the "delay"
      cachedTarget.classList.add(tapClass);
      requestAnimationFrame(() => {
        onClick(e);
        requestAnimationFrame(() => {
          // only remove the tapActive class once the UI is no longer blocked
          cachedTarget.classList.remove(tapClass);
        });
      });
    });
  };

  return {
    onTouchStart,
    onTouchMove,
    onClick: wrappedOnClick,
  };
}
