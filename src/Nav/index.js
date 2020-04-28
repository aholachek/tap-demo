import React from "react";
import useTappable from "../useTappable";

const NavItem = ({
  name,
  icon: Icon,
  setPage,
  activePage,
  color,
  backgroundColor,
}) => {
  const listeners = useTappable({
    onClick: () => {
      setPage(name);
    },
    preventDefault: true,
  });

  return (
    <li key={name}>
      <a
        style={{
          "--color": color,
          "--backgroundColor": backgroundColor,
        }}
        className={`navItem ${activePage === name ? "navItemActive" : ""}`}
        href={`/${name}`}
        {...listeners}
      >
        <Icon />
      </a>
    </li>
  );
};

export default function Nav({ setPage, activePage, config }) {
  return (
    <nav className="nav">
      <ul className={"navList"}>
        {config.map((data) => {
          return (
            <NavItem setPage={setPage} activePage={activePage} {...data} />
          );
        })}
      </ul>
    </nav>
  );
}
