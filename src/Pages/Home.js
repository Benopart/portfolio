import React from "react";
import HeroSection from "../Components/Sections/HeroSection";
import About from "../Components/Sections/About";

import Slider from "../Components/Slider";

export default function Home() {
  return (
    <div className="MainBody">
      <HeroSection></HeroSection>
      <About></About>

      <Slider></Slider>
    </div>
  );
}
