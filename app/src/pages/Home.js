import React from "react";

import Navbar from "components/NavBar";
import Vaccines from "./vaccine/Vaccines";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Vaccines />
    </div>
  );
};

export default Home;
