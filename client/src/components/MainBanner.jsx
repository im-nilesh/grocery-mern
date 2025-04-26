import React from "react";
import { assets } from "../assets/assets";

const MainBanner = () => {
  return (
    <div>
      <img
        src={assets.main_banner_bg}
        alt="main_banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="main_banner"
        className="w-full md:hidden"
      />
    </div>
  );
};

export default MainBanner;
