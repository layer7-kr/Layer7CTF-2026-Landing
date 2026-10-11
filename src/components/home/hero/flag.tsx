import { motion } from "motion/react";
import { useEffect, useId, useState } from "react";

import s from "./style.module.scss";

// Keep the original Figma outline and both attachment points on the pole.
const CLOTH_SHAPES = [
  "M1.025 2.94423C11.025 -4.05577 21.025 10.9442 31.025 2.94423V21.9442C21.025 29.9442 11.025 13.9442 1.025 21.9442V2.94423Z",
  "M1.025 2.94423C11.025 4.94423 21.025 6.44423 30.525 4.54423V23.5442C21.025 25.9442 11.025 23.4442 1.025 21.9442V2.94423Z",
  "M1.025 2.94423C11.025 8.94423 21.025 -3.55577 29.725 2.44423V21.4442C21.025 15.9442 11.025 28.4442 1.025 21.9442V2.94423Z",
  "M1.025 2.94423C11.025 0.44423 21.025 -0.55577 30.525 1.34423V20.3442C21.025 18.9442 11.025 18.9442 1.025 21.9442V2.94423Z",
];

export default function HeroFlag({
  near = false,
  revealed,
}: {
  near?: boolean;
  revealed: boolean;
}) {
  const fabricId = useId();
  const [canAnimate, setCanAnimate] = useState(
    () =>
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !document.hidden,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanAnimate(!preference.matches && !document.hidden);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const animateCloth = canAnimate && revealed;

  return (
    <g
      className={s.hero_marker}
      transform={
        near
          ? "translate(516.565 281.5054)"
          : "translate(1008.57 108.9543) scale(0.8)"
      }
      color={near ? "#20F7A1" : "#F2F2F2"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={fabricId} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#0e0e0e" />
          <stop offset="0.35" stopColor={near ? "#15372b" : "#292c2b"} />
          <stop offset="0.65" stopColor="#0e0e0e" />
          <stop offset="1" stopColor={near ? "#11271e" : "#202221"} />
        </linearGradient>
      </defs>
      <ellipse
        cx="1.025"
        cy="36.9442"
        rx="4.5"
        ry="1.5"
        fill="currentColor"
        opacity="0.14"
      />
      <g className={s.flag_unfurl}>
        <motion.path
          className={near ? s.flag_cloth_near : undefined}
          d={CLOTH_SHAPES[0]}
          initial={false}
          animate={{
            d: animateCloth
              ? [...CLOTH_SHAPES, CLOTH_SHAPES[0]]
              : CLOTH_SHAPES[0],
          }}
          transition={
            animateCloth
              ? {
                  duration: near ? 5.2 : 6.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : { duration: 0 }
          }
          fill={`url(#${fabricId})`}
          stroke="currentColor"
          strokeWidth="2.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M1.025 36.9442V2.94423"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
    </g>
  );
}
