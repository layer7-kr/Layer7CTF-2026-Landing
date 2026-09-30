import {
  About,
  Calendar,
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
        text="Jeopardy"
        description="문제를 해결해 플래그를 제출하고 점수를 획득하는 방식입니다."
        image="/images/merit/n1.png"
      />
      <Merit
        text="KOTH"
        description="제한 시간 동안 시스템을 점유하고 방어해 점수를 획득하는 방식입니다."
        image="/images/merit/n2.png"
        reversed
      />
      <Calendar />
      <Footer />
    </>
  );
}
