import React from "react";

// this is the name of the class we will toggle on and off an element when it is tapped
const activeClassName = "tapActive";

// a helper function to grab an element off an event
const getInteractiveEl = (event) => {
  try {
    const path = event.composedPath();
    const bodyIndex = path.indexOf(document.body);
    // find the first interactive element in the path of elements that the event bubbled up into
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

// use "click" instead of "touchend" because it is triggered after touchend
// and we want the tap styles to stay on the element as long as possible
// (this makes a difference at leeast on later iOS versions)
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
