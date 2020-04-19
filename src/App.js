import React from "react";
import styles from "./App.scss";
import TapWrapper from "./TapWrapper";

const fib = (n) => {
  if (n === 0 || n === 1) return n;
  return fib(n - 2) + fib(n - 1);
};

function Home() {
  fib(40);
  return <div className={"page"}>Home</div>;
}

function Search() {
  fib(40);
  return <div className={"page"}>Search</div>;
}

function Nav({ setPage, activePage }) {
  return (
    <nav>
      <ul className={"navList"}>
        {["home", "search"].map((name) => {
          return (
            <li key={name}>
              <TapWrapper>
                <a
                  className={`navItem ${
                    activePage === name ? "navItemActive" : ""
                  }`}
                  href={`/${name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(name);
                  }}
                >
                  {name}
                </a>
              </TapWrapper>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function App() {
  const [page, setPage] = React.useState("home");
  return (
    <div className="app">
      {page === "home" ? <Home /> : <Search />}
      <Nav activePage={page} setPage={setPage} />
    </div>
  );
}

export default App;
