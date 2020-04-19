import React from "react";

export default function TapWrapper({
  children,
  WrapperEl = "div",
  tappedStyle = null,
  distanceThreshold = 3,
  delay = 0,
  ...rest
}) {
  const [initialPressed, setInitialPressed] = React.useState(false);
  const isTapped = Boolean(initialPressed);
  return (
    <WrapperEl
      data-tap-active={isTapped}
      style={isTapped ? tappedStyle : null}
      onTouchStart={(e) => {
        setInitialPressed({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }}
      onTouchMove={(e) => {
        const distance =
          Math.abs(e.touches[0].clientX - initialPressed.x) +
          Math.abs(e.touches[0].clientY - initialPressed.y);
        if (distance >= distanceThreshold) setInitialPressed(false);
      }}
      onTouchEnd={() => {
        setTimeout(() => {
          setInitialPressed(false);
        }, 0);
      }}
      {...rest}
    >
      {children}
    </WrapperEl>
  );
}
