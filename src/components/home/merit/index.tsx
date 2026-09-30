import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { VStack } from "@/components/ui/stack";
import { useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

interface Props {
  reversed?: boolean;
  text: string;
  description: string;
  image: string;
}

export default function Merit({ reversed = false, text, description, image }: Props) {
  const animation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const TextBlock = (
    <motion.div
      ref={animation.ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={s.left}
    >
      <VStack gap={16}>
        <Typo.BodyLarge>{text}</Typo.BodyLarge>
        <Typo.Body className={s.description}>{description}</Typo.Body>
      </VStack>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      className={s.image_container}
      initial={{ opacity: 0, y: 30 }}
      animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <img src={image} alt="" className={s.image} />
    </motion.div>
  );

  return (
    <Section gap={48} className={s.merit}>
      {reversed ? ImageBlock : TextBlock}
      {reversed ? TextBlock : ImageBlock}
    </Section>
  );
}
