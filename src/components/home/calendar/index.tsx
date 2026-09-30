import { File, Flag, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { Typo } from "@/components/ui";
import { HStack, VStack } from "@/components/ui/stack";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Calendar() {
  const titleAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });
  const cardAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  return (
    <section className={s.calendar}>
      <div className={s.content}>
        <motion.div
          style={{ width: "50%" }}
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={titleAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VStack gap={42}>
            <VStack gap={16}>
              <Typo.Headline>대회 일정</Typo.Headline>
              <Typo.BodyLarge as="p" className={s.description}>
                2026 Layer7 CTF는 11월 21일, 온라인에서 8시간 동안 진행됩니다.
                <br />
                참가 신청과 세부 운영 안내는 순차적으로 공개됩니다.
              </Typo.BodyLarge>
            </VStack>
            <div className={s.recent_notice}>
              <Typo.Body>NOTICE</Typo.Body>
              <Typo.BodyLarge>Coming Soon</Typo.BodyLarge>
              <Typo.Subtext className={s.recent_notice_link}>세부 공지 준비 중</Typo.Subtext>
            </div>
          </VStack>
        </motion.div>

        <motion.div
          style={{ width: "50%" }}
          ref={cardAnimation.ref}
          variants={cardAnimation.containerVariants}
          initial="hidden"
          animate={cardAnimation.isInView ? "visible" : "hidden"}
        >
          <VStack gap={12}>
            <motion.article className={[s.card, s.card_now].join(" ")} variants={cardAnimation.itemVariants}>
              <VStack gap={8}>
                <Typo.Display className={s.card_title}>참가 신청</Typo.Display>
                <Typo.Body className={s.card_date}>10월 19일 ~ 11월 20일</Typo.Body>
              </VStack>
              <File className={s.card_icon} />
            </motion.article>
            <motion.article className={s.card} variants={cardAnimation.itemVariants}>
              <VStack gap={20}>
                <VStack gap={8}>
                  <Typo.Display className={s.card_title}>CTF 대회</Typo.Display>
                  <Typo.Body className={s.card_date}>11월 21일 오전 10시 ~ 오후 6시</Typo.Body>
                </VStack>
                <HStack gap={20}>
                  <Typo.Body className={s.card_info_name}>진행 방식</Typo.Body>
                  <Typo.Body className={s.card_info_value}>개인전 · Jeopardy + KOTH</Typo.Body>
                </HStack>
                <HStack gap={20}>
                  <Typo.Body className={s.card_info_name}>참가 장소</Typo.Body>
                  <Typo.Body className={s.card_info_value}>온라인</Typo.Body>
                </HStack>
              </VStack>
              <Flag className={s.card_icon} />
            </motion.article>
            <motion.article className={s.card} variants={cardAnimation.itemVariants}>
              <VStack gap={8}>
                <Typo.Display className={s.card_title}>검증 및 시상</Typo.Display>
                <Typo.Body className={s.card_date}>대회 종료 후 상위 5명 Write-up 검수</Typo.Body>
              </VStack>
              <ShieldCheck className={s.card_icon} />
            </motion.article>
          </VStack>
        </motion.div>
      </div>
    </section>
  );
}
