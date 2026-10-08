import { motion } from "motion/react";

import { Typo } from "@/components/ui";
import Spacing from "@/components/ui/spacing";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Hero() {
  const animation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

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

      <motion.div
        className={s.hero_map_container}
        initial={{ opacity: 0, y: 40 }}
        animate={
          animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <svg
          viewBox="0 0 1440 419"
          width="1440"
          height="419"
          role="img"
          aria-label="Layer7 CTF"
          className={s.hero_map}
        >
          {/* Original SVG layers from Figma Frame 1024 (2:90). */}
          <image
            href="/images/hero/ring-world/quiet-star-field.svg"
            x="208.35"
            y="42.45"
            width="1012.25"
            height="331.25"
          />
          <image
            href="/images/hero/ring-world/rings-behind-planet.svg"
            x="282.01"
            y="100.07"
            width="877.65"
            height="217.52"
          />
          <image
            href="/images/hero/ring-world/planet-front-hemisphere.svg"
            className={s.hero_planet}
            x="597.525"
            y="100.525"
            width="246.95"
            height="246.95"
          />
          <image
            href="/images/hero/ring-world/rings-in-front-of-planet.svg"
            x="282.315"
            y="130.385"
            width="877.7"
            height="217.57"
          />
          <image
            href="/images/hero/ring-world/distant-moon.svg"
            x="1131.625"
            y="80.625"
            width="20.75"
            height="20.75"
          />
          <image
            href="/images/hero/ring-world/ring-flag-far.svg"
            x="1008.57"
            y="108.9543"
            width="25.64"
            height="30.3754"
          />
          <image
            href="/images/hero/ring-world/ring-flag-near.svg"
            x="516.565"
            y="281.5054"
            width="32.05"
            height="37.9692"
          />
        </svg>
      </motion.div>
    </section>
  );
}
