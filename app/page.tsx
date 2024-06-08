import React from "react";
import Timer from "@/components/commons/Timer";
import Navigation from "@/components/commons/Navigation";
import Footer from "@/components/commons/Footer";

export default function Home() {
  return (
    <div className="w-full ">
      <Navigation />
      <Timer />
      <Footer />
    </div>
  );
}
