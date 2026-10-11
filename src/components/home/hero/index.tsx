import { motion } from "motion/react";
import { useId, useState } from "react";

import { Typo } from "@/components/ui";
import Spacing from "@/components/ui/spacing";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { useScrollAnimation } from "@/hooks";

import HeroFlag from "./flag";
import s from "./style.module.scss";

export default function Hero() {
  const effectId = useId();
  const [readyLayers, setReadyLayers] = useState(0);
  const onLayerReady = () => setReadyLayers((count) => count + 1);
  const animation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });
  const revealed = animation.isInView && readyLayers >= 3;

  return (
    <section className={s.hero}>
      <motion.div
        className={s.hero_text}
        ref={animation.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={
          animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <VStack gap={12} align={FlexAlign.Center}>
          <h2 className={s.hero_subtitle}>We hack the</h2>
          <h1 className={s.hero_title}>2026 Layer7 CTF</h1>
        </VStack>
        <div className={s.countdown_container}>
          <Typo.BodyLarge className={s.coming_soon}>Coming Soon</Typo.BodyLarge>
        </div>
      </motion.div>

      <Spacing size={120} />

      <div className={s.hero_map_container} data-revealed={revealed}>
        <svg
          viewBox="0 0 1440 419"
          width="1440"
          height="419"
          role="img"
          aria-label="Layer7 CTF"
          className={s.hero_map}
        >
          <defs>
            <radialGradient id={`${effectId}-glow`}>
              <stop offset="0.5" stopColor="#70f0ac" stopOpacity="0" />
              <stop offset="0.7" stopColor="#70f0ac" stopOpacity="0.32" />
              <stop offset="1" stopColor="#70f0ac" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${effectId}-light`}>
              <stop stopColor="#a0ffcc" stopOpacity="0" />
              <stop offset="0.5" stopColor="#c2ffdf" stopOpacity="0.5" />
              <stop offset="1" stopColor="#a0ffcc" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${effectId}-surface`}>
              <circle cx="721" cy="224" r="123" />
            </clipPath>
          </defs>
          {/* Original SVG layers from Figma Frame 1024 (2:90). */}
          <image
            href="/images/hero/ring-world/quiet-star-field.svg"
            className={s.hero_stars}
            x="208.35"
            y="42.45"
            width="1012.25"
            height="331.25"
          />
          <image
            href="/images/hero/ring-world/rings-behind-planet.svg"
            className={s.hero_rings}
            onLoad={onLayerReady}
            onError={onLayerReady}
            x="282.01"
            y="100.07"
            width="877.65"
            height="217.52"
          />
          <g className={s.hero_planet}>
            <circle
              className={s.planet_glow}
              cx="721"
              cy="224"
              r="185"
              fill={`url(#${effectId}-glow)`}
              aria-hidden="true"
            />
            <g className={s.planet_reveal}>
              <image
                href="/images/hero/ring-world/planet-front-hemisphere.svg"
                onLoad={onLayerReady}
                onError={onLayerReady}
                x="597.525"
                y="100.525"
                width="246.95"
                height="246.95"
              />
              <g clipPath={`url(#${effectId}-surface)`} aria-hidden="true">
                <g transform="rotate(-24 721 224)">
                  <rect
                    className={s.planet_light}
                    x="460"
                    y="60"
                    width="140"
                    height="330"
                    fill={`url(#${effectId}-light)`}
                  />
                </g>
              </g>
              <circle
                className={s.planet_rim}
                cx="721"
                cy="224"
                r="123"
                fill="none"
                stroke="#b0ffd2"
                strokeWidth="1.2"
                aria-hidden="true"
              />
            </g>
          </g>
          <image
            href="/images/hero/ring-world/rings-in-front-of-planet.svg"
            className={s.hero_rings}
            onLoad={onLayerReady}
            onError={onLayerReady}
            x="282.315"
            y="130.385"
            width="877.7"
            height="217.57"
          />
          <HeroFlag revealed={revealed} />
          <HeroFlag near revealed={revealed} />
          <image
            href="/images/hero/ring-world/distant-moon.svg"
            className={s.hero_stars}
            x="1131.625"
            y="80.625"
            width="20.75"
            height="20.75"
          />
        </svg>
      </div>
    </section>
  );
}
