// components/Timer.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlay, IoPause } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ShortBreak: React.FC = ({ labels, currentTab, onClick }: any) => {
  const [time, setTime] = useState<number>(300); // 5 minutes
  const [isActive, setIsActive] = useState<boolean>(false);
  const [state, setState] = useState();
  const [showAlert, setShowAlert] = useState(false);

  type TabProps = {
    labels: string[];
    currentTab: string;
    onClick: (label: string) => void;
  };

  const percentage = 66;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    } else if (time === 0) {
      if (interval) clearInterval(interval);
      const audio = new Audio("/wind-up-clock-alarm-bell-64219.mp3");
      audio.play();
      setShowAlert(true);
      return;
      // alert("Time is up!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const shortBreak = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleShort = () => {
    setIsActive(!isActive);
  };
  const handleLong = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(300);
    setShowAlert(false);
    // setTime(20);
  };

  const [stage, setStage] = useState(0);
  const switchStage = (index: any) => {
    setStage(index);
  };

  const options = ["Pomodoro", "shortBreak", "LongBreak"];

  return (
    <div className="w-full ">
      <div className="lg:max-w-6xl  mx-auto px-5 ">
        {/* Tabs UI */}
        <div className="justify-center mx-auto my-7 ">
          <div style={{ width: 200 }} className="flex justify-center mx-auto">
            <CircularProgressbarWithChildren value={5} className="mx-auto">
              <h1 className="text-6xl font-bold dark:text-white text-black text-center py-7  ">
                {shortBreak(time)}
              </h1>
            </CircularProgressbarWithChildren>
          </div>
          <div className="flex justify-center gap-5 py-7  ">
            <button
              onClick={handleStartPause}
              className="py-2 px-5 dark:bg-white  bg-gray-900 text-blue-500 font-bold rounded-xl "
            >
              {isActive ? <IoPause /> : <IoPlay />}
            </button>
            <button
              className="py-2 px-5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl"
              onClick={handleReset}
            >
              <LuTimerReset />
            </button>
          </div>
        </div>
        {/* {showAlert && (
          <Alert onClick={() => setShowAlert(false)} className="">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-bold text-lg">
              Waktu Istrahat kamu sudah habis!{" "}
            </AlertTitle>
            <AlertDescription>
              Waktu istirahat kamu sudah habis, saatnya kamu mulai belajar
              kembali👌😉📚
            </AlertDescription>
          </Alert>
        )} */}
        {/* Akhit Tabs UI*/}
      </div>
    </div>
  );
};

export default ShortBreak;
