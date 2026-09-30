import { File, Flag } from "lucide-react";

export const Competition = [
  {
    icon: File,
    title: "대회 신청",
    startDate: new Date("2026-10-19T00:00:00+09:00").getTime(),
    endDate: new Date("2026-11-20T23:59:59+09:00").getTime(),
    description: "온라인 개인전으로 진행되며, 참가 신청에 관한 자세한 안내는 추후 공개됩니다.",
    eligibility: [
      {
        name: "중등부",
        value: "전국 중학생",
      },
      {
        name: "고등부",
        value: "전국 고등학생",
      },
      {
        name: "일반부",
        value: "일반 참가자",
      },
    ],
  },
  {
    icon: Flag,
    title: "CTF 대회",
    startDate: new Date("2026-11-21T10:00:00+09:00").getTime(),
    endDate: new Date("2026-11-21T18:00:00+09:00").getTime(),
    description: "대회 중 서버 로그를 검수하며, 종료 후 상위 5명은 Write-up을 제출합니다.",
    eligibility: [
      {
        name: "대회 장소",
        value: "온라인",
      },
      {
        name: "진행 방식",
        value: "개인전 · Jeopardy + KOTH",
      },
    ],
    preparation: ["노트북 또는 PC", "안정적인 인터넷 환경"],
  },
];
