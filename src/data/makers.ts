export interface ProblemSetter {
  name: string;
  role: string;
}

// 문제 출제자 데이터
export const ProblemSetters: { [year: string]: ProblemSetter[] } = {
  "2026": [{ name: "Coming Soon", role: "출제진 협의 중" }],
};

export function getMakerYears() {
  return Object.keys(ProblemSetters).sort((a, b) => b.localeCompare(a));
}
