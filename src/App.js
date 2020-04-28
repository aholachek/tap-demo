import React from "react";
import Nav from "./Nav";
import { ReactComponent as DogIcon } from "./assets/Dog.svg";
import { ReactComponent as CatIcon } from "./assets/Cat.svg";
import { ReactComponent as BirdIcon } from "./assets/Bird.svg";
import { ReactComponent as HorseIcon } from "./assets/Horse.svg";
import { ReactComponent as FrogIcon } from "./assets/Frog.svg";
import { ReactComponent as HippoIcon } from "./assets/Hippo.svg";
import { ReactComponent as FishIcon } from "./assets/Fish.svg";

import dogFace from "./assets/dog-face.jpg";
import catFace from "./assets/cat-face.jpg";
import birdFace from "./assets/bird-face.jpg";

import fishFace from "./assets/fish-face.jpg";
import frogFace from "./assets/frog-face.jpg";
import hippoFace from "./assets/hippo-face.jpg";
import horseFace from "./assets/horse-face.png";

import "./App.scss";

const fib = (n) => {
  if (n === 0 || n === 1) return n;
  return fib(n - 2) + fib(n - 1);
};

const fibCount = 39;

const paraSizes = {
  cat: [50, 25, 30, 50, 25, 50, 50, 10, 25, 50, 50, 30, 30, 50, 25, 10],
  bird: [25, 50, 50, 30, 30, 50, 25, 10, 25, 50, 50, 30, 30, 50, 25, 10],
  dog: [30, 50, 25, 50, 30, 50, 30, 10, 25, 50, 50, 30, 30, 50, 25, 10],
};

function Page({ profilePic, name, color }) {
  fib(fibCount);
  React.useEffect(() => {
    document.head
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", color);
  }, [color]);

  return (
    <div>
      <div
        className="topNav"
        style={{
          "--color": color,
        }}
      ></div>
      <div className={"page"}>
        <img src={profilePic} alt="" className="profile" />
        <div className="wire-frame">
          {(paraSizes[name] || paraSizes.cat).map((r) => (
            <div style={{ height: r }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

const config = [
  {
    name: "dog",
    icon: DogIcon,
    profilePic: dogFace,
    color: "#342EAD",
    backgroundColor: "hsla(243, 58%, 43%, 0.1)",
  },
  {
    name: "bird",
    icon: BirdIcon,
    profilePic: birdFace,
    color: "#1DB2A6",
    backgroundColor: "hsla(175, 72%, 41%, 0.1)",
  },
  {
    name: "cat",
    icon: CatIcon,
    profilePic: catFace,
    color: "#EA6228",
    backgroundColor: "hsla(18, 82%, 54%, 0.1)",
  },
  {
    name: "horse",
    icon: HorseIcon,
    profilePic: horseFace,
    color: "#801336",
    backgroundColor: "hsla(341, 74%, 29%, 0.1)",
  },
  {
    name: "frog",
    icon: FrogIcon,
    profilePic: frogFace,
    color: "#8CBA50",
    backgroundColor: "hsla(86, 43%, 52%, 0.1)",
  },
  {
    name: "hippo",
    icon: HippoIcon,
    profilePic: hippoFace,
    color: "#827397",
    backgroundColor: "hsla(265, 15%, 52%, 0.18)",
  },
  {
    name: "fish",
    icon: FishIcon,
    profilePic: fishFace,
    color: "#FF5733",
    backgroundColor: "hsla(11, 100%, 60%, 0.1)",
  },
];

function App() {
  const [page, setPage] = React.useState("dog");
  const data = config.find((c) => c.name === page);
  const profilePic = data.profilePic;
  return (
    <div className="app">
      <Page profilePic={profilePic} name={page} color={data.color} key={page} />
      <Nav activePage={page} setPage={setPage} config={config} />
    </div>
  );
}

export default App;
