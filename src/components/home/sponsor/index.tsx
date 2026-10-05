import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, HStack, VStack } from "@/components/ui/stack";
import { useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Sponsor() {
  const animation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  return (
    <Section padding={64} gap={64}>
      <motion.div
        ref={animation.ref}
        initial={{ opacity: 0, y: 40 }}
        animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
      >
        <VStack gap={48} align={FlexAlign.Center}>
          <div className={s.hosting}>
            <HStack gap={20} align={FlexAlign.Center}>
              <Typo.Body className={s.sponsor_text}>주최</Typo.Body>
              <Typo.BodyLarge>선린인터넷고등학교</Typo.BodyLarge>
            </HStack>
            <HStack gap={20} align={FlexAlign.Center}>
              <Typo.Body className={s.sponsor_text}>주관</Typo.Body>
              <Typo.BodyLarge>Layer7</Typo.BodyLarge>
            </HStack>
          </div>

          <VStack gap={20} align={FlexAlign.Center}>
            <Typo.Body className={s.sponsor_text}>Sponsor</Typo.Body>
            <img
              src="/images/sponsor/hspace.svg?v=2026-10-05"
              alt="HSPACE"
              className={s.hspace_logo}
            />
          </VStack>
        </VStack>
      </motion.div>
    </Section>
  );
}
