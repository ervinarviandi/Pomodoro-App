// components/Timer.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ShortBreak from "./ShortBreak";
import LongBreaks from "./LongBreak";
import { IoPlay, IoPause } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { LapTimerIcon } from "@radix-ui/react-icons";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Timer: React.FC = ({ labels, currentTab, onClick }: any) => {
  const [time, setTime] = useState<number>(1500); // 25 minutes
  const [isActive, setIsActive] = useState<boolean>(false);
  const [state, setState] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  type TabProps = {
    labels: string[];
    currentTab: string;
    onClick: (label: string) => void;
  };

  const percentage = 100;

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

      // alert("Waktu kamu sudah selesai");
    }

    // const playSound = () => {
    //   const audio = new Audio('/alarm.mp3');
    // audio.play();
    // }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const shortBreak = (time: number) => {
    const minutes = Math.floor(time / 10);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  const LongBreak = (time: number) => {
    const minutes = Math.floor(time / 150);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isSound) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsSound(!isSound);
    }
  };

  const handleShort = () => {
    setIsActive(!isActive);
  };
  const handleLong = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(1500);
    setShowAlert(false);
  };

  const [stage, setStage] = useState(0);
  const switchStage = (index: any) => {
    setStage(index);
  };

  const options = ["Pomodoro", "shortBreak", "LongBreak"];

  return (
    <div className="h-screen w-full pt-32 ">
      <div className="lg:max-w-6xl  mx-auto px-5 ">
        <div className="flex justify-center mx-auto ">
          <Tabs defaultValue="account ">
            <TabsList>
              <TabsTrigger value="account">Pomodoro</TabsTrigger>
              <TabsTrigger value="password">Short Break</TabsTrigger>
              <TabsTrigger value="longbreak">Long Break</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div
                style={{ width: 200 }}
                className="flex justify-center mx-auto my-7"
              >
                <CircularProgressbarWithChildren
                  styles={{
                    background: {
                      fill: "#3e98c7",
                    },
                  }}
                  value={25}
                  className="mx-auto"
                >
                  <div>
                    <h1 className="text-6xl font-bold dark:text-white text-black text-center py-7 ">
                      {formatTime(time)}
                    </h1>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="flex justify-center gap-5 pb-14 ">
                <button
                  onClick={handleStartPause}
                  className="py-2 px-5 dark:bg-white bg-gray-900 text-blue-500 font-bold rounded-xl"
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
            </TabsContent>
            <TabsContent value="password">
              <ShortBreak />
            </TabsContent>
            <TabsContent value="longbreak">
              <LongBreaks />
            </TabsContent>
          </Tabs>
        </div>

        {showAlert && (
          <Alert onClick={() => setShowAlert(false)} className="mb-7">
            <LapTimerIcon className="h-4 w-4" />
            <AlertTitle className="font-bold text-lg">
              Waktu belajar kamu sudah habis !!{" "}
            </AlertTitle>
            <AlertDescription>
              Saatnya kamu istirahat, tentukan waktu istirahatmu sekarang dan
              mulai belajar kembali👌😉📚
            </AlertDescription>
          </Alert>
        )}

        {/* Akhit Tabs UI*/}
      </div>
    </div>
  );
};

export default Timer;
