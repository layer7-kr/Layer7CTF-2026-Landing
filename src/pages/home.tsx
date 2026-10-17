import {
  About,
  Calendar,
  Contact,
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
      <About />
      <Merit
        text="Jeopardy"
        description="여러 해킹 문제 중 원하는 문제를 선택하여 해결하는 방식으로, 문제마다 점수가 정해져 있으며, Flag를 찾아 제출하면 점수를 획득합니다. 제한 시간 안에 최대한 많은 문제를 해결하여 점수를 얻는 것이 목표입니다."
        image="/images/merit/n1.png"
      />
      <Merit
        text="KOTH"
        description="참가자들이 같은 환경에서 주어진 목표를 달성하며 실시간으로 경쟁하는 방식입니다. Jeopary 방식과 달리 단순히 문제를 해결하는 것뿐만 아니라 변화하는 상황에 맞춰 전략을 세우고 지속적으로 점수를 획득하는 것이 중요합니다."
        image="/images/merit/n2.png"
        reversed
      />
      <Calendar />
      <Money />
      <Contact />
      <Footer />
    </SpaceBackground>
  );
}
