import React from "react";

const activeClassName = "tapActive";

const getInteractiveEl = (event) => {
  // ignore older browsers
  if (!event.composedPath) return;
  const path = event.composedPath();
  const bodyIndex = path.indexOf(document.body);
  return path
    .slice(0, bodyIndex === -1 ? path.length : bodyIndex)
    .filter(
      (el) =>
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.getAttribute("role") === "button" ||
        el.getAttribute("role") === "link"
    )[0];
};

const addClass = (event) => {
  const interactiveEl = getInteractiveEl(event);
  if (interactiveEl) interactiveEl.classList.add(activeClassName);
};

const removeClass = (event) => {
  const interactiveEl = getInteractiveEl(event);
  if (!interactiveEl) return;
  if (event.type === "click") {
    interactiveEl.classList.add(activeClassName);
    return setTimeout(() => {
      interactiveEl.classList.remove(activeClassName);
    });
  }
  if (!interactiveEl.classList.contains(activeClassName)) return;
  interactiveEl.classList.remove(activeClassName);
};

const removeActiveClassEvents = ["touchmove", "touchcancel", "click"];

export default function useTapActivePolyfill() {
  React.useEffect(() => {
    // ignore older browsers
    if (!document.body.classList) return;

    document.body.addEventListener("touchstart", addClass, false);
    removeActiveClassEvents.forEach((event) =>
      document.body.addEventListener(event, removeClass, false)
    );

    return () => {
      document.body.removeEventListener("touchstart", addClass, false);
      removeActiveClassEvents.forEach((event) =>
        document.body.removeEventListener(event, removeClass, false)
      );
    };
  }, []);
}
