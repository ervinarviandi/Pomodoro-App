"use client";
import React, { useState } from "react";
import { ModeToggle } from "@/components/atoms/modetoggle";
// import { GearIcon } from "@radix-ui/react-icons";
import Brands from "@/assets/164.Clock-Is-Ticking.png";
import Image from "next/image";

const Navigation = () => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="fixed w-full py-4 border-b backdrop-blur">
      <div className="lg:max-w-6xl mx-auto flex justify-between items-center px-5 ">
        <div className="flex items-center gap-x-2">
          <Image
            src={Brands}
            width={30}
            height={30}
            alt="BrandsIcons"
            className={`
              duration-700 ease-in-out group-hover:opacity-75 rounded-full
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
            onLoad={() => setLoading(false)}
          />
          <h1>Pomodoro Timer</h1>
        </div>
        <div className="flex items-center gap-x-2">
          {/* <span>
            <GearIcon fontSize={24} />
          </span> */}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
