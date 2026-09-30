import {
  About,
  Calendar,
  FormAbout,
  Hero,
  Merit,
  Sponsor,
} from "@/components/home";
import { Header, Light } from "@/components/ui";
import Footer from "@/components/ui/footer";
import Spacing from "@/components/ui/spacing";

export default function Home() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <Hero />
      <Sponsor />
      <About />
      <Merit
        text="전국 누구나 참여하는 온라인 개인전"
        description="중등부·고등부·일반부로 나누어 진행하며, 참가자는 개인 자격으로 실력을 겨룹니다."
        image="/images/merit/n1.png"
      />
      <Merit
        text="실력을 겨루는 CTF"
        description="문제별 난이도와 풀이 현황에 따라 점수가 동적으로 산정됩니다."
        image="/images/merit/n2.png"
        reversed
      />
      <Calendar />
      <FormAbout />
      <Footer />
    </>
  );
}
