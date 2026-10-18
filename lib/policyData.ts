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
        label: "더높게  |  한계를 넘는 도약",
        items: [
          "우수 석학 제도 개선",
          "World Class 석학 특별채용 프로그램 도입",
          "산업계 석좌교수(Chaired Professor) 제도 활성화",
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
          "단과대 연구기금 조성 및 기본연구비 신설",
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
        label: "더높게  |  한계를 넘는 도약",
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
        items: ["예산 효율성 강화", "단과대 연구기금 조성 및 기본연구비 신설"],
      },
      {
        label: "다함께  |  조화로운 다양성",
        items: [
          "단과대학•학과 모금 지원 체계화",
          "해외 교우 네트워크를 통한 모금 확대",
        ],
      },
      {
        label: "더높게  |  한계를 넘는 도약",
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
        label: "더높게  |  한계를 넘는 도약",
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
  /** "\n" marks Figma's own line breaks — kept on the desktop layout,
      read as a space on the phone layout. */
  title: string;
  points: string[];
  /** Figma tightens this item's bullets (-0.03em) so its long lines fit. */
  tight?: boolean;
};

// Figma section3 (node 612:1471, synced 2026-10-18): six promises, each a
// title over three bullet points.
export const promises: Promise[] = [
  {
    index: "첫째,",
    title: "도전적, 창의적 연구를 위한 연구기금을 조성하겠습니다",
    points: [
      "장학금, 건축 중심에서 연구비 중심으로 기부금 구조를 전환",
      "전임교원 약 1,800명 기준 1인당 1억 원 규모 조성 목표",
      "단과대학별 연구자 중심의 자율적 연구비 집행체계 마련",
    ],
  },
  {
    index: "둘째,",
    title: "AI 시대에 걸맞는 대학 본연의 교육을 확립하겠습니다",
    points: [
      "AI를 활용한 창의적이고 독창적인 교육 지원",
      "대학 본연의 사명에 충실한 사고력과 판단력 중심 교육 강화",
      "문제 해결능력과 사회기여를 키우는 자유로운 지성 교육 확대",
    ],
  },
  {
    index: "셋째,",
    title: "학생의 복리와 안전을 증진하기 위한 다양하고 구체적인 정책을 펴겠습니다",
    points: [
      "수요자(학생) 중심의 자기주도형 전공설계 지원 및 상담체계 구축",
      "학비 지원을 넘어서 생활비 지원으로 장학금 패러다임의 전환",
      "학생의 복지와 안전을 강화하는 주거환경 조성\n(1인 1실 기숙사 확대, 주거시설 인증제)",
    ],
  },
  {
    index: "넷째,",
    title: "전문성과 균형으로 행정발전을 도모하고 구성원이\n행복한 일터를 만들겠습니다",
    points: [
      "책임행정 구현을 위한 행정역량TF의 구성과 이를 통한 행정체계의 정교화와 안정화",
      "직원의 체계적·지속적 교육·훈련을 통한 전문성 강화 및 일과 삶의 균형(워라밸)을\n보장하는 근무 형태 확대",
      "상호 신뢰와 존중에 기반한 협력적 노사문화의 정착",
    ],
    tight: true,
  },
  {
    index: "다섯째,",
    title: "고려대학교 브랜드를 세계 수준으로 올려놓겠습니다",
    points: [
      "세계 최고 수준의 대학, 기업, 국제기구와 글로벌 파트너십 강화",
      "3개 고대병원의 특성화를 통한 대학병원 브랜드 이미지 강화",
      "해외 파견(outgoing)과 유치(incoming)의 결합을 통한 시너지 창출",
    ],
  },
  {
    index: "여섯째,",
    title: "사회에 공헌하고 학문 공동체를 선도하는 대학을\n만들겠습니다",
    points: [
      "공적 책임을 다하는 대학의 사회적 역할(USR) 강화",
      "국내 최고의 대학으로서 위상에 걸맞는 국가와 사회에 대한 실질적 기여의 확대",
      "전 세계에 흩어진 교우들이 자부심을 느낄 수 있는 선도적 품격의 확립",
    ],
  },
];

export type PlanCard = {
  /** Part anchor on the detail page (lib/planDetail.ts): plan/#<detailId>. */
  detailId: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

// Figma (node 612:1416, synced 2026-09-28) reordered these to 다함께 →
// 나답게 → 앞으로 and gave all three the same full-bleed background photo
// (previously campus-tiger/campus-aerial alternated per card). 앞으로 was
// renamed 더높게 on 2026-10-17. Each card opens its part of the P2-2
// detail page (app/plan).
export const planCards: PlanCard[] = [
  {
    detailId: "together",
    title: "다함께",
    subtitle: "조화로운 다양성",
    description:
      "서로 다르기 때문에 더 강하고, 함께하기 때문에 더 멀리 나아가는 고려대학교를 만들겠습니다",
    image: "/images/plan-card-bg.png",
  },
  {
    detailId: "essence",
    title: "나답게",
    subtitle: "대학의 본질 회복",
    description:
      "내적 충실함을 바탕으로 고려대학교가 더욱 고려대학교답게 발전하도록 하겠습니다",
    image: "/images/plan-card-bg.png",
  },
  {
    detailId: "higher",
    title: "더높게",
    subtitle: "한계를 넘는 도약",
    description:
      "우리 스스로 키운 실력과 함께 모은 힘으로 한계를 넘어 도약하는 고려대학교를 만들겠습니다",
    image: "/images/plan-card-bg.png",
  },
];
