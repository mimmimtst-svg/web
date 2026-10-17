import { policyCards } from "./policyData";

/**
 * P2-2 — the detail page behind section 2's three cards (나답게 · 다함께 ·
 * 더높게). Condensed from the candidate's platform booklet (pp. 8–17) to a
 * short summary per part and a "~한 대학" title with one or two lines per
 * pillar (2026-10-17: the full text was too long to read on the web; the
 * booklet itself will be offered as a download).
 *
 * A pledge's code ("1-4") is kept only for grouping: its first number is
 * the policy area (1 선도적 연구 … 5 헌신과 존중의 리더십 — the P4 cards'
 * titles), which labels the group in the 세부 공약 box.
 */

export type PlanPledge = { code: string; label: string };

export type PlanPillar = {
  title: string;
  body: string;
  pledges: PlanPledge[];
};

export type PlanPart = {
  /** Anchor id; section 2's cards link to `plan/#<id>`. */
  id: string;
  number: string;
  title: string;
  subtitle: string;
  /** The booklet's bold closing line — the part in one sentence. */
  lead: string;
  summary: string;
  pillars: PlanPillar[];
};

export type PledgeGroup = { area: string; pledges: PlanPledge[] };

/** Groups a pillar's pledges by policy area, in the order they appear. */
export function groupPledges(list: PlanPledge[]): PledgeGroup[] {
  const groups: PledgeGroup[] = [];
  for (const pledge of list) {
    const number = pledge.code.split("-")[0].padStart(2, "0");
    const area = policyCards.find((card) => card.number === number)?.title ?? "";
    const last = groups[groups.length - 1];
    if (last && last.area === area) last.pledges.push(pledge);
    else groups.push({ area, pledges: [pledge] });
  }
  return groups;
}

const pledges = (list: string): PlanPledge[] =>
  list
    .trim()
    .split("\n")
    .map((line) => {
      const [code, ...label] = line.trim().split(" ");
      return { code, label: label.join(" ") };
    });

export const planParts: PlanPart[] = [
  {
    id: "essence",
    number: "01",
    title: "나답게",
    subtitle: "대학의 본질 회복",
    lead: "내적 충실함을 바탕으로 고려대학교가 더욱 고려대학교답게 발전하도록 하겠습니다.",
    summary:
      "대학의 본질은 교육과 연구입니다. 순위와 외형이 아니라 좋은 연구와 좋은 교육, 구성원의 역량이 온전히 발휘되는 내적 실력으로 성장하겠습니다. 그 실력이 쌓일 때 평가와 명성은 자연스럽게 따라옵니다.",
    pillars: [
      {
        title: "교육과 연구의 기본이 튼튼한 대학",
        body: "모든 교수가 안정적으로 연구할 수 있는 기금·연구비·공간을 마련하고, AI 시대에도 흔들리지 않는 인재를 키우는 유연한 학사체계를 만들겠습니다.",
        pledges: pledges(`
          1-1 단과대별 연구기금 조성 및 기본연구비 신설
          1-2 연구동 신축 추진 및 안정적 연구 공간 확보
          1-3 연구활동 및 성과 지원
          2-1 인문학적 성찰과 과학기술의 이해
          2-2 전공은 더 깊게, 교양은 더 넓게
          2-3 스스로 설계하는 전공과 학업
          2-4 AI 교육혁신센터
        `),
      },
      {
        title: "재정이 건전하고 투명한 대학",
        body: "한정된 재원을 효율적으로 배분하고 운영 내역을 투명하게 공개해, 외형이 아닌 내실을 키우는 재정을 실천하겠습니다.",
        pledges: pledges(`
          3-1 예산 효율성 강화
          3-2 스마트 리소스 캠퍼스 (Smart Resource Campus)
        `),
      },
      {
        title: "행정이 경쟁력이 되는 대학",
        body: "연구가 행정 절차에 막히지 않도록 행정을 혁신하고, 공정하고 예측 가능한 인사로 행정 자체를 대학의 경쟁력으로 만들겠습니다.",
        pledges: pledges(`
          4-1 행정역량 TF 출범
          4-2 산학협력단 행정혁신
          4-3 공정하고 예측 가능한 직원 인사
        `),
      },
      {
        title: "평가보다 실질적 발전을 좇는 대학",
        body: "대외 순위와 지표를 목표로 삼지 않고, 교육과 연구가 얼마나 충실한지를 제대로 평가해 더 좋은 대학으로 가는 이정표로 삼겠습니다.",
        pledges: pledges(`
          5-3 자긍심이 넘치는 대학평가 체계 구축
        `),
      },
      {
        title: "구성원의 헌신이 존중받는 대학",
        body: "소소한 헌신까지 인정받는 보상체계, 캠퍼스와 병원의 동반 성장, 생활 걱정 없는 학생 지원으로 구성원과 교우의 자긍심을 지키겠습니다.",
        pledges: pledges(`
          5-1 교원과 직원의 상호존중 문화
          5-2 헌신을 인정받는 보상체계
          5-4 캠퍼스·병원 특성화 및 통합 발전전략 추진
          5-5 학생 생활 안정
          5-6 모교와 하나 되는 교우
        `),
      },
    ],
  },
  {
    id: "together",
    number: "02",
    title: "다함께",
    subtitle: "조화로운 다양성",
    lead: "서로 다르기 때문에 더 강하고, 함께하기 때문에 더 멀리 나아가는 고려대학교를 만들겠습니다.",
    summary:
      "대학은 서로 다른 학문과 사람이 함께하는 공동체입니다. 차이를 갈등이 아닌 포용의 출발점으로 삼아, 자율성·다양성·창의성이 살아 있는 대학을 만들겠습니다.",
    pillars: [
      {
        title: "모든 학문과 구성원이 인정받는 대학",
        body: "획일적인 기준 대신 학문의 특성을 존중해 인재를 유연하게 확보하고, 학문후속세대와 융합연구, 인문사회 연구를 균형 있게 뒷받침하겠습니다.",
        pledges: pledges(`
          1-4 학과 자율 기반 우수 교원 채용제도 확립
          1-5 학문후속세대 지원체계 구축
          1-6 KU Grand Challenge 융합연구 프로그램 신설
          1-7 인문사회분야 연구 컨트롤타워 구축
        `),
      },
      {
        title: "한 사람도 놓치지 않는 열린 교육의 대학",
        body: "학업에 어려움을 겪는 학생과 외국인 학생까지 양질의 교육을 받게 하고, 잘 가르치는 교수가 정당하게 평가받도록 하겠습니다.",
        pledges: pledges(`
          2-5 한 사람도 놓치지 않는 교육
          2-6 교수와 학생이 함께 만드는 배움
          2-7 잘 가르치는 교수가 인정받는 대학
        `),
      },
      {
        title: "단과대학과 학과가 자율적으로 성장하는 대학",
        body: "학과 단위 모금과 학과 중심 행정으로 자율성을 넓히고, 주요 제도는 구성원의 의견을 충분히 듣고 결정하겠습니다.",
        pledges: pledges(`
          3-3 단과대학·학과 모금 지원 체계화
          3-4 해외 교우 네트워크를 통한 모금 확대
          4-4 학과 중심의 행정체계 수립
          4-5 구성원이 참여하는 행정결정
          4-6 일과 삶의 균형을 이루는 근무환경
          4-7 건강하고 발전적인 노사관계 구축
        `),
      },
      {
        title: "존중과 소통이 일상인 대학",
        body: "구성원의 헌신을 함께 기억하고, 본부와의 정례 소통과 외국인 구성원·교수 커뮤니티 지원으로 존중의 문화를 대학 전체에 넓히겠습니다.",
        pledges: pledges(`
          5-7 한마음의 날 신설
          5-8 학내 소통 정례화
          5-9 다문화 수용능력 제고
          5-10 리더십 아카데미 신설
          5-11 총장 타운홀 미팅 정례화
          5-12 교수 연구 및 교류 커뮤니티 활동 지원
          5-13 고대병원 교직원 및 학생 전용창구 및 상담사 설치
        `),
      },
    ],
  },
  {
    id: "higher",
    number: "03",
    title: "더높게",
    subtitle: "한계를 넘는 도약",
    lead: "우리 스스로 키운 실력과 함께 모은 힘으로 한계를 넘어 도약하는 고려대학교를 만들겠습니다.",
    summary:
      "고려대학교는 현실에 안주하지 않는 도전으로 성장해 왔습니다. 예산·제도·관행의 장벽을 낮춰 구성원의 창의적인 도전이 현실이 되게 하고, 세상을 바꾸는 연구와 교육에 과감하게 도전하겠습니다.",
    pillars: [
      {
        title: "세계를 선도하는 연구의 대학",
        body: "세계적 석학 영입과 국제 공동연구를 넓히고 AI 기반 연구 인프라를 갖춰, 고려대학교에서 세계를 선도하는 연구가 나오게 하겠습니다.",
        pledges: pledges(`
          1-8 우수 석학 제도 개선
          1-9 World Class 석학 특별채용 프로그램 도입
          1-10 산업체 Chaired Professor 제도 활성화
          1-11 국제 공동연구 Seed Fund의 글로벌 대형연구 연계
          1-12 AI 기반 연구 인프라 구축
          1-13 석탑기금교수
        `),
      },
      {
        title: "세계를 향해 열린 교육의 대학",
        body: "세계 정상급 대학과의 교육협력을 넓히고 학생들의 위대한 도전을 지원하며, 대학의 지식과 교육자원을 사회에 개방하겠습니다.",
        pledges: pledges(`
          2-8 학생들의 '위대한 도전'을 지원하는 대학
          2-9 대학의 지식이 사회의 힘이 되는 교육
          2-10 캠퍼스와 국경을 뛰어넘는 대학
        `),
      },
      {
        title: "새로운 재원으로 한계를 넘는 대학",
        body: "등록금과 기존 모금에만 기대지 않고 기업·교우·새 수익원을 발굴하며, 구성원의 창업을 체계적으로 지원하겠습니다.",
        pledges: pledges(`
          3-5 모금 패러다임 전환
          3-6 장기발전기금(엔다우먼트) 조성
          3-7 기업 연계 모금 확대
          3-8 등록금 외 수입 다변화 및 자구노력 확대
          3-9 Idea to Venture - 아이디어가 글로벌 기업이 되는 고려대학교
        `),
      },
      {
        title: "행정이 혁신을 이끄는 대학",
        body: "불필요한 절차와 오래된 관행을 걷어내고 AI·디지털 행정을 도입하며, 직원의 전문성과 현장의 아이디어가 혁신으로 이어지게 하겠습니다.",
        pledges: pledges(`
          4-8 AI·디지털 기반 미래형 행정체계 구축
          4-9 직원 경력 사다리와 전문직무 트랙 구축
          4-10 전문성 기반 보직 운영 확대
          4-11 행정혁신 펀드 신설
        `),
      },
      {
        title: "세계가 인정하는 품격의 대학",
        body: "헌신을 기리는 문화와 글로벌 표준의 행정, 미래형 친환경 캠퍼스, 총장 직속 AI 혁신 전략위원회로 세계 수준의 대학을 만들겠습니다.",
        pledges: pledges(`
          5-14 FINE KU Award·The Class KU 명예의 전당 신설
          5-15 국내 최고 수준의 대학행정
          5-16 글로벌 표준에 맞는 대학행정
          5-17 미래형 친환경 캠퍼스 구축
          5-18 준법지원실 설치
          5-19 'AI 혁신 전략위원회' 설치
        `),
      },
    ],
  },
];
