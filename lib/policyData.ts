/** A pledge in the table: its code ("2-9") and title. The code opens
    the pledge on the 주요 공약 page (lib/pledgeDetail.ts, same codes). */
export type PolicyItem = { code: string; text: string };

export type PolicyCategory = {
  label: string;
  items: PolicyItem[];
};

export type PolicyCard = {
  number: string;
  title: string;
  categories: PolicyCategory[];
};

const items = (list: string): PolicyItem[] =>
  list
    .trim()
    .split("\n")
    .map((line) => {
      const [code, ...text] = line.trim().split(" ");
      return { code, text: text.join(" ") };
    });

const 나답게 = "나답게  |  대학의 본질 회복";
const 다함께 = "다함께  |  조화로운 다양성";
const 더높게 = "더높게  |  한계를 넘는 도약";

// The 발전계획서 체계도 table (revised 2026-10-23: 2-9 학생 생활 안정 지원
// 등 and the 4-x / 5-x renumbering, new 4-5, 4-12 and 5-9, eight pledges
// dropped); the five areas are its rows, 나답게 / 다함께 / 더높게 its
// columns, in the table's order. Codes aren't shown on screen.
export const policyCards: PolicyCard[] = [
  {
    number: "01",
    title: "선도적 연구",
    categories: [
      {
        label: 나답게,
        items: items(`
          1-1 단과대별 연구기금 조성 및 기본연구비 신설
          1-2 연구동 신축 추진 및 안정적 연구 공간 확보
          1-3 연구활동 및 성과 지원
        `),
      },
      {
        label: 다함께,
        items: items(`
          1-4 학과 자율 기반 우수 교원 채용제도 확립
          1-5 학문후속세대 지원체계 구축
          1-6 KU Grand Challenge 융합연구 프로그램 신설
          1-7 인문사회분야 연구 컨트롤타워 구축 등
        `),
      },
      {
        label: 더높게,
        items: items(`
          1-8 우수 석학 제도 개선
          1-9 World Class 석학 특별채용 프로그램 도입
          1-10 산업체 Chaired Professor 제도 활성화
          1-11 국제 공동연구 Seed Fund의 글로벌 대형연구 연계
          1-12 AI 기반 연구 인프라 구축 및 KU AI-RG 도입
          1-13 석탑기금교수
        `),
      },
    ],
  },
  {
    number: "02",
    title: "열린 교육",
    categories: [
      {
        label: 나답게,
        items: items(`
          2-1 인문학적 성찰과 과학기술의 이해
          2-2 전공은 더 깊게, 교양은 더 넓게
          2-3 스스로 설계하는 전공과 학업
          2-4 AI 교육혁신센터
          2-9 학생 생활 안정 지원 등
        `),
      },
      {
        label: 다함께,
        items: items(`
          2-5 한 사람도 놓치지 않는 교육
          2-6 교수와 학생이 함께 만드는 배움
          2-7 잘 가르치는 교수가 인정받는 대학
        `),
      },
      {
        label: 더높게,
        items: items(`
          2-8 학생들의 ‘위대한 도전’을 지원하는 대학
          2-10 캠퍼스와 국경을 뛰어 넘는 대학
          2-11 대학의 지식이 사회의 힘이 되는 교육
        `),
      },
    ],
  },
  {
    number: "03",
    title: "건전 재정",
    categories: [
      {
        label: 나답게,
        items: items(`
          3-1 예산 효율성 강화
          3-2 스마트 리소스 캠퍼스
        `),
      },
      {
        label: 다함께,
        items: items(`
          3-3 단과대학·학과 모금 지원 체계화
          3-4 해외 교우 네트워크를 통한 모금 확대
        `),
      },
      {
        label: 더높게,
        items: items(`
          3-5 모금 패러다임 전환
          3-6 장기발전기금 (엔다우먼트) 조성
          3-7 기업 연계 모금 확대
          3-8 등록금 외 수입 다변화 및 자구노력 확대
          3-9 Idea to Venture - 아이디어가 글로벌 기업이 되는 고려대학교
        `),
      },
    ],
  },
  {
    number: "04",
    title: "전문적 행정과 인사경영",
    categories: [
      {
        label: 나답게,
        items: items(`
          4-1 행정역량TF 출범
          4-3 산학협력단 행정 혁신
          4-5 직원이 행정주체가 되는 재량행정, 창의행정 문화 조성
          4-9 공정하고 예측 가능한 직원 인사
        `),
      },
      {
        label: 다함께,
        items: items(`
          4-2 학과 중심의 행정체계 수립
          4-4 구성원이 참여하는 행정결정
          4-7 일과 삶의 균형을 이루는 근무환경
          4-12 고대병원 혜택 확대 등
        `),
      },
      {
        label: 더높게,
        items: items(`
          4-6 AI·디지털 기반 미래형 행정체계 구축
          4-8 직원 경력 사다리와 전문직무 트랙 구축
          4-10 전문성 기반 보직 운영 확대
          4-11 행정 혁신 펀드 신설
          4-13 준법지원실 설치
          4-14 ‘AI 혁신 전략위원회’ 설치
        `),
      },
    ],
  },
  {
    number: "05",
    title: "헌신과 존중의 리더십",
    categories: [
      {
        label: 나답게,
        items: items(`
          5-1 헌신을 인정받는 보상체계
          5-2 자긍심이 넘치는 대학 평가 체계 구축
          5-3 캠퍼스·병원 특성화 및 통합 발전 전략 추진
          5-8 모교와 하나 되는 교우
        `),
      },
      {
        label: 다함께,
        items: items(`
          5-4 총장 타운홀 미팅 정례화
          5-5 대표조직과의 소통 정례화
          5-6 다문화 수용능력 제고
        `),
      },
      {
        label: 더높게,
        items: items(`
          5-7 친환경 스마트 캠퍼스 구축
          5-9 고등교육을 선도하며 교육과 연구로 사회에 공헌하는 고려대학교
          5-10 리더십 아카데미 신설
        `),
      },
    ],
  },
];

export type Promise = {
  index: string;
  title: string;
  points: string[];
  /** Figma tightens this item's bullets (-0.03em) so its long lines fit. */
  tight?: boolean;
};

// Figma section3 (node 612:1471, synced 2026-10-18): six promises, each a
// title over three bullet points. Figma's hand line breaks are left out —
// screens wider than the 1920 frame fit more on a line, so lines wrap
// only where the column runs out, between words.
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
      // The parenthetical moves to the next line as one piece (no-break
      // spaces) rather than leaving "인증제)" on a line of its own.
      "학생의 복지와 안전을 강화하는 주거환경 조성 (1인\u00a01실\u00a0기숙사\u00a0확대,\u00a0주거시설\u00a0인증제)",
    ],
  },
  {
    index: "넷째,",
    title: "전문성과 균형으로 행정발전을 도모하고 구성원이 행복한 일터를 만들겠습니다",
    points: [
      "책임행정 구현을 위한 행정역량TF의 구성과 이를 통한 행정체계의 정교화와 안정화",
      "직원의 체계적·지속적 교육·훈련을 통한 전문성 강화 및 일과 삶의 균형(워라밸)을 보장하는 근무 형태 확대",
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
    title: "사회에 공헌하고 학문 공동체를 선도하는 대학을 만들겠습니다",
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
// detail page (app/plan). 2026-10-23: one photo per card instead — 서울
// campus, 세종 campus, 의료원 (in card order), under the same dark overlay.
export const planCards: PlanCard[] = [
  {
    detailId: "together",
    title: "다함께",
    subtitle: "조화로운 다양성",
    description:
      "서로 다르기 때문에 더 강하고, 함께하기 때문에 더 멀리 나아가는 고려대학교를 만들겠습니다",
    image: "/images/plan-card-seoul-2026-10-23.webp",
  },
  {
    detailId: "essence",
    title: "나답게",
    subtitle: "대학의 본질 회복",
    description:
      "내적 충실함을 바탕으로 고려대학교가 더욱 고려대학교답게 발전하도록 하겠습니다",
    image: "/images/plan-card-sejong-2026-10-23.webp",
  },
  {
    detailId: "higher",
    title: "더높게",
    subtitle: "한계를 넘는 도약",
    description:
      "우리 스스로 키운 실력과 함께 모은 힘으로 한계를 넘어 도약하는 고려대학교를 만들겠습니다",
    image: "/images/plan-card-medical-2026-10-23.webp",
  },
];
