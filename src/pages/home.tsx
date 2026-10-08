import {
  About,
  Calendar,
  Hero,
  Merit,
  Money,
  Sponsor,
} from "@/components/home";
import SpaceBackground from "@/components/home/space-background";
import { Header, Light } from "@/components/ui";
import Footer from "@/components/ui/footer";
import Spacing from "@/components/ui/spacing";

export default function Home() {
  return (
    <SpaceBackground>
      <Spacing size={64} />
      <Light />
      <Header />
      <Hero />
      <Sponsor />
      <Money />
      <About />
      <Merit
        text="Jeopardy"
        description="문제를 해결해 플래그를 제출하고 점수를 획득하는 방식입니다."
        image="/images/merit/n1.png"
      />
      <Merit
        text="KOTH"
        description="바이너리나 프로그램을 서버에 반복 제출하고, 평가 결과에 따라 점수를 누적하는 방식입니다."
        image="/images/merit/n2.png"
        reversed
      />
      <Calendar />
      <Footer />
    </SpaceBackground>
  );
}
