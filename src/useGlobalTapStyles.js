import React from "react";

const activeClassName = "tapActive";

const getInteractiveEl = (event) => {
  try {
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
  } catch (e) {
    return undefined;
  }
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
    // keep the tap style on 1 tick later in case the UI blocks
    return setTimeout(() => {
      interactiveEl.classList.remove(activeClassName);
    });
  }
  if (!interactiveEl.classList.contains(activeClassName)) return;
  interactiveEl.classList.remove(activeClassName);
};

const removeActiveClassEvents = ["touchmove", "touchcancel", "click"];

function addTapListeners() {
  document.body.addEventListener("touchstart", addClass, false);
  removeActiveClassEvents.forEach((event) =>
    document.body.addEventListener(event, removeClass, false)
  );
}

function removeTapListeners() {
  document.body.removeEventListener("touchstart", addClass, false);
  removeActiveClassEvents.forEach((event) =>
    document.body.removeEventListener(event, removeClass, false)
  );
}

export default function useGlobalTypeStyles() {
  React.useEffect(() => {
    addTapListeners();
    return removeTapListeners;
  }, []);
}
