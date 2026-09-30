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
        animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
        animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img src="/flag.svg?v=2026-09-30" alt="" className={s.hero_flag} />
        <img src="/flag-green.svg?v=2026-09-30" alt="" className={s.hero_flag_green} />
        <img
          src="/images/hero/map.svg?v=2026-09-30"
          alt="Layer7 CTF"
          className={s.hero_map}
        />
        <div className={s.hero_map_overlay} />
      </motion.div>
    </section>
  );
}
