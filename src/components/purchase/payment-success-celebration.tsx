"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import doneAnimation from "@/assets/lottie/done.json";

function ConfettiBurst({ data }: { data: object }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, x: "-55%", scale: 0.55 }}
        animate={{ opacity: 1, x: "-8%", scale: 0.58 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 h-[48vh] w-[42vw] max-w-[420px] -translate-x-full -translate-y-1/2"
      >
        <Lottie animationData={data} loop={false} className="h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: "55%", scale: 0.55 }}
        animate={{ opacity: 1, x: "8%", scale: 0.58 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 h-[48vh] w-[42vw] max-w-[420px] -translate-y-1/2 scale-x-[-1]"
      >
        <Lottie animationData={data} loop={false} className="h-full w-full" />
      </motion.div>
    </div>
  );
}

export function PaymentSuccessConfetti({ show }: { show: boolean }) {
  const [confettiData, setConfettiData] = useState<object | null>(null);

  useEffect(() => {
    if (!show) return;

    fetch("/lottie/confetti.json")
      .then((res) => res.json())
      .then(setConfettiData)
      .catch(() => null);
  }, [show]);

  return (
    <AnimatePresence>
      {show && confettiData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[200]"
        >
          <ConfettiBurst data={confettiData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PaymentSuccessTick({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Lottie
        animationData={doneAnimation}
        loop={false}
        className="mx-auto h-[100px] w-[100px] sm:h-[112px] sm:w-[112px]"
      />
    </div>
  );
}
