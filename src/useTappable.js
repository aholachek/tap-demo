import React from "react";

export default function useTappable({
  delay = 75,
  tapClass = "tapActive",
  preventDefault,
  onClick,
} = {}) {
  const timeoutRef = React.useRef();

  const onTouchStart = (e) => {
    const cachedTarget = e.currentTarget;
    timeoutRef.current = setTimeout(() => {
      cachedTarget.classList.add(tapClass);
    }, delay);
  };

  const onTouchMove = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    e.currentTarget.classList.remove(tapClass);
  };

  const wrappedOnClick = (e) => {
    e.persist();
    const cachedTarget = e.currentTarget;
    if (preventDefault) e.preventDefault();

    const isClick = Boolean(timeoutRef.current);
    if (!isClick) return;

    requestAnimationFrame(() => {
      cachedTarget.classList.add(tapClass);
      requestAnimationFrame(() => {
        onClick(e);
        requestAnimationFrame(() => {
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
