export interface PrizeInfo {
  medal: boolean;
  prize: string;
}

export interface PrizeCategory {
  first: PrizeInfo;
  second: PrizeInfo;
  third: PrizeInfo;
}

export interface PrizeData {
  total: number;
  middle: PrizeCategory;
  high: PrizeCategory;
  general: PrizeCategory;
}

export const Prize: PrizeData = {
  total: 1500000,
  middle: {
    first: {
      medal: true,
      prize: "로지텍 PRO X SUPERLIGHT",
    },
    second: {
      medal: true,
      prize: "SanDisk SSD",
    },
    third: {
      medal: true,
      prize: "AULA F87 키보드",
    },
  },
  high: {
    first: {
      medal: true,
      prize: "30만원",
    },
    second: {
      medal: true,
      prize: "15만원",
    },
    third: {
      medal: true,
      prize: "5만원",
    },
  },
  general: {
    first: {
      medal: true,
      prize: "50만원",
    },
    second: {
      medal: true,
      prize: "30만원",
    },
    third: {
      medal: true,
      prize: "20만원",
    },
  },
};

export const getPrizeTableData = (category: PrizeCategory) => [
  {
    rank: "1등",
    certificate: "선린인터넷고등학교장",
    prize: category.first.prize,
  },
  {
    rank: "2등",
    certificate: "선린인터넷고등학교장",
    prize: category.second.prize,
  },
  {
    rank: "3등",
    certificate: "선린인터넷고등학교장",
    prize: category.third.prize,
  },
];
