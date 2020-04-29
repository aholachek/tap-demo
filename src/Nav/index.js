import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ name, icon: Icon, activePage, color, backgroundColor }) => {
  return (
    <li>
      <Link
        onTouchStart={(e) => e.currentTarget.classList.add("tapActive")}
        onTouchMove={(e) => e.currentTarget.classList.remove("tapActive")}
        style={{
          "--color": color,
          "--backgroundColor": backgroundColor,
        }}
        className={`navItem ${activePage === name ? "navItemActive" : ""}`}
        to={`/${name}`}
      >
        <Icon />
      </Link>
    </li>
  );
};

export default function Nav({ setPage, activePage, config }) {
  return (
    <nav className="nav">
      <ul className={"navList"}>
        {config.map((data) => {
          return (
            <NavItem
              setPage={setPage}
              activePage={activePage}
              {...data}
              key={data.name}
            />
          );
        })}
      </ul>
    </nav>
  );
}
