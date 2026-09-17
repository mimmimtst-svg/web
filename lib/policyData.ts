export type PolicyCategory = {
  label: string;
  items: string[];
};

export type PolicyCard = {
  number: string;
  title: string;
  categories: PolicyCategory[];
};

export const policyCards: PolicyCard[] = [
  {
    number: "01",
    title: "선도적 연구",
    categories: [
      {
        label: "나답게  |  대학의 본질 회복",
        items: ["단과대 연구기금 조성 및 기본연구비 신설"],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: [
          "우수 교원 확보를 위한 적극적 제도 개선",
          "학문후속세대 양성",
          "교원 다양성 확대",
        ],
      },
      {
        label: "앞으로  |  한계를 넘는 도약",
        items: [
          "우수 석학 제도 개선",
          "World Class 석학 특별채용 프로그램 도입",
          "산업계 석좌교수 (Chaired Professor) 제도 활성화",
          "국제 공동연구 Seed Fund 확대",
          "AI 기반 연구역량 강화",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "열린 교육",
    categories: [
      {
        label: "나답게  |  대학의 본질 회복",
        items: [
          "AI 시대 인문학 기반 융합교양 교육과정 정립",
          "특수대학원 경쟁력 확보",
        ],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: [
          "이중/복수 전공 진입 문턱 완화",
          "외국인 학생에 대한 교육의 질 제고",
          "교원 교육의무 개편",
        ],
      },
      {
        label: "앞으로  |  한계를 넘는 도약",
        items: [
          "해외 Top-tier 대학과의 공동학위 확대",
          "해외 우수 인재의 대학원 유치",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "건전 재정",
    categories: [
      {
        label: "나답게  |  대학의 본질 회복",
        items: ["예산 효율성 강화"],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: [
          "단과대학•학과 모금 지원 체계화",
          "해외 교우 네트워크를 통한 모금 확대",
        ],
      },
      {
        label: "앞으로  |  한계를 넘는 도약",
        items: [
          "모금 패러다임 전환",
          "기업연계 모금 확대",
          "장기발전기금 (엔다우먼트) 조성",
          "등록금 외 수입 다변화 및 자구노력 확대",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "전문적 행정과 인사경영",
    categories: [
      {
        label: "나답게  |  대학의 본질 회복",
        items: [
          "산학협력단 행정 혁신",
          "행정 혁신 TF 출범",
          "공정한 직원 인사",
        ],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: [
          "학과 중심 행정체계 수립",
          "일과 삶의 균형을 추구하는 인사체계",
          "건강한 노사관계 구축",
        ],
      },
      {
        label: "앞으로  |  한계를 넘는 도약",
        items: ["행정 혁신 TF 출범", "직원 경력 사다리 구축"],
      },
    ],
  },
  {
    number: "05",
    title: "헌신과 존중의 리더십",
    categories: [
      {
        label: "나답게  |  대학의 본질 회복",
        items: ["자긍심 넘치는 평가체계 구축"],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: ["한마음의 날 신설", "학내 소통 정례화"],
      },
    ],
  },
];

export type Promise = {
  index: string;
  title: string;
  body: string;
};

export const promises: Promise[] = [
  {
    index: "첫째,",
    title: "단과대학별로 전임교원 1인당 1억원 규모로 연구기금을 설치하겠습니다",
    body: "Your bold vision, our trusted craft. We partner with forward-thinking companies to redefine and elevate the building, construction and architecture landscape.",
  },
  {
    index: "둘째,",
    title: "AI시대에 걸맞는 교육과정을 확립하겠습니다",
    body: "Your bold vision, our trusted craft. We partner with forward-thinking companies to redefine and elevate the building, construction and architecture landscape.",
  },
  {
    index: "셋째,",
    title: "행정혁신TF를 설치하여 학교 행정을 원점에서부터 살피겠습니다",
    body: "Your bold vision, our trusted craft. We partner with forward-thinking companies to redefine and elevate the building, construction and architecture landscape.",
  },
];

export type PlanCard = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export const planCards: PlanCard[] = [
  {
    title: "나답게",
    subtitle: "대학의 본질 회복",
    description:
      "내적 충실함을 바탕으로 고려대학교가 더욱 고려대학교답게 발전하도록 하겠습니다",
    image: "/images/campus-tiger.png",
  },
  {
    title: "다함께",
    subtitle: "조화로운 다양성",
    description:
      "서로 다르기 때문에 더 강하고, 함께하기 때문에 더 멀리 나아가는 고려대학교를 만들겠습니다",
    image: "/images/campus-aerial.png",
  },
  {
    title: "앞으로",
    subtitle: "한계를 넘는 도약",
    description:
      "우리 스스로 키운 실력과 함께 모은 힘으로 한계를 넘어 도약하는 고려대학교를 만들겠습니다",
    image: "/images/campus-tiger.png",
  },
];
