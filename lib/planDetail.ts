import { policyCards } from "./policyData";

/**
 * P2-2 — the detail page behind section 2's three cards (나답게 · 다함께 ·
 * 더높게). Condensed from the candidate's platform booklet (pp. 8–17) to a
 * short summary per part and a "~한 대학" title with one or two lines per
 * pillar (2026-10-17: the full text was too long to read on the web; the
 * booklet itself will be offered as a download).
 *
 * A pledge's code ("1-4") is not shown: its first number is the policy
 * area (1 선도적 연구 … 5 헌신과 존중의 리더십 — the P4 cards' titles),
 * which labels the group in the 세부 공약 box, and it links the pledge to
 * its entry on the 주요 공약 page (lib/pledgeDetail.ts, same codes; a
 * new pledge without an entry there yet is shown without a link).
 * 2026-10-23: pledges, codes and the changed sentences follow the revised
 * booklet (pp. 9–17).
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
  title: string;
  subtitle: string;
  /** The booklet's bold closing line — the part in one sentence. */
  lead: string;
  /** P2-1 (발전 방향): the booklet's short statement of the part (p. 8),
      shown above `lead`. */
  vision: string;
  /** What the part covers, in the booklet's own words — it introduces
      the pillars listed under it. */
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
    title: "나답게",
    subtitle: "대학의 본질 회복",
    lead: "내적 충실함을 바탕으로 고려대학교가 더욱 고려대학교답게 발전하도록 하겠습니다.",
    vision:
      "대학의 본질은 교육과 연구입니다. 외형적 성장을 좇기보다 대학 본연의 기능에 충실하여 우리 스스로의 실력을 키우겠습니다. 좋은 연구와 교육이 이루어지고 구성원들이 자신의 역량을 충분히 발휘할 수 있는 대학을 만들겠습니다.",
    summary:
      "대학의 본질은 교육과 연구입니다. 교수는 연구에 몰입하고 학생은 좋은 교육으로 성장할 수 있도록 교육과 연구의 기본을 튼튼히 하겠습니다. 재정과 행정, 평가 체계를 내실 있게 바로 세우고, 대학을 지탱하는 구성원의 헌신과 생활을 함께 뒷받침하겠습니다.",
    pillars: [
      {
        title: "교육과 연구의 기본이 튼튼한 대학",
        body: "모든 교수가 안정적으로 연구할 수 있는 기금·연구비·공간을 마련하고, AI 시대에도 흔들리지 않는 인재를 키우는 유연한 학사체계를 만들겠습니다. 생활비 지원과 기숙사 확충으로 학생들이 생활 걱정 없이 학업에 전념하게 하겠습니다.",
        pledges: pledges(`
          1-1 단과대별 연구기금 조성 및 기본연구비 신설
          1-2 연구동 신축 추진 및 안정적 연구 공간 확보
          1-3 연구활동 및 성과 지원
          2-1 인문학적 성찰과 과학기술의 이해
          2-2 전공은 더 깊게, 교양은 더 넓게
          2-3 스스로 설계하는 전공과 학업
          2-4 AI 교육혁신센터
          2-9 학생 생활 안정 지원 등
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
          4-3 산학협력단 행정혁신
          4-5 직원이 행정의 주체가 되는 재량행정, 창의행정 문화 조성
          4-9 공정하고 예측 가능한 직원 인사
        `),
      },
      {
        title: "평가보다 실질적 발전을 좇는 대학",
        body: "대외 순위와 지표를 목표로 삼지 않고, 교육과 연구가 얼마나 충실한지를 제대로 평가해 더 좋은 대학으로 가는 이정표로 삼겠습니다.",
        pledges: pledges(`
          5-2 자긍심이 넘치는 대학평가 체계 구축
        `),
      },
      {
        title: "헌신에 보상하고 교우와 함께하는 대학",
        body: "작은 헌신까지 빠짐없이 인정받는 보상체계를 갖추고, 서울캠퍼스와 세종캠퍼스, 고대병원이 조화롭게 함께 성장하며, 교우들의 자긍심을 드높이겠습니다.",
        pledges: pledges(`
          5-1 헌신을 인정받는 보상체계
          5-3 캠퍼스·병원 특성화 및 통합 발전전략 추진
          5-8 모교와 하나 되는 교우
        `),
      },
    ],
  },
  {
    id: "together",
    title: "다함께",
    subtitle: "조화로운 다양성",
    lead: "서로 다르기 때문에 더 강하고, 함께하기 때문에 더 멀리 나아가는 고려대학교를 만들겠습니다.",
    vision:
      "다양성과 포용성은 대학 발전의 중요한 힘입니다. 서로 다른 학문과 교육, 구성원이 각자의 특성과 가치를 인정받고 함께 발전할 수 있는 대학을 만들겠습니다. 다양성을 더욱 넓히는 동시에 서로의 차이를 존중하고 소통하며 조화롭게 협력하도록 하겠습니다.",
    summary:
      "대학은 서로 다른 학문과 구성원이 함께하는 공동체입니다. 각 학문과 구성원의 특성과 가치를 존중하고, 한 사람도 놓치지 않는 교육과 단과대학·학과 중심의 자율적인 운영을 이루겠습니다. 서로의 차이를 인정하고 소통하며 존중이 일상이 되는 대학을 만들겠습니다.",
    pillars: [
      {
        title: "모든 학문과 구성원이 인정받는 대학",
        body: "획일적인 기준 대신 학문의 특성을 존중해 인재를 유연하게 확보하고, 학문후속세대와 융합연구, 인문사회 연구를 균형 있게 뒷받침하겠습니다.",
        pledges: pledges(`
          1-4 학과 자율 기반 우수 교원 채용제도 확립
          1-5 학문후속세대 지원체계 구축
          1-6 KU Grand Challenge 융합연구 프로그램 신설
          1-7 인문사회분야 연구 컨트롤타워 구축 등
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
        body: "학과 단위 모금과 학과 중심 행정으로 자율성을 넓히고, 주요 제도는 구성원의 의견을 충분히 듣고 결정하겠습니다. 직원에게는 공정한 기회와 일과 삶의 균형을 보장하겠습니다.",
        pledges: pledges(`
          3-3 단과대학·학과 모금 지원 체계화
          3-4 해외 교우 네트워크를 통한 모금 확대
          4-2 학과 중심의 행정체계 수립
          4-4 구성원이 참여하는 행정결정
          4-7 일과 삶의 균형을 이루는 근무환경
          4-12 고대병원 혜택 확대 등
        `),
      },
      {
        title: "존중과 소통이 일상인 대학",
        body: "구성원과 대학 본부가 꾸준히 소통하며 서로 다른 의견을 충분히 듣고 조정하고, 언어와 문화가 다른 외국인 구성원도 동등한 구성원으로 함께하게 하겠습니다.",
        pledges: pledges(`
          5-4 총장 타운홀 미팅 정례화
          5-5 대표조직과의 소통 정례화
          5-6 다문화 수용능력 제고
        `),
      },
    ],
  },
  {
    id: "higher",
    title: "더높게",
    subtitle: "한계를 넘는 도약",
    lead: "우리 스스로 키운 실력과 함께 모은 힘으로 한계를 넘어 도약하는 고려대학교를 만들겠습니다.",
    vision:
      "우리의 실력과 다양성의 힘을 바탕으로 더 높은 목표를 향해 끊임없이 도전하겠습니다. 예산과 제도, 관행의 제약을 넘어 구성원의 창의적인 도전이 현실이 될 수 있도록 필요한 자원과 환경을 마련하겠습니다. 새로운 학문의 영역을 개척하고 세계를 향한 연구와 교육에 과감하게 도전하겠습니다.",
    summary:
      "지금까지 잘해 온 것을 지키는 데 머물지 않겠습니다. 세계를 선도하는 연구와 세계를 향해 열린 교육에 도전하고, 새로운 재원 발굴과 행정 혁신으로 그 도전을 뒷받침하겠습니다. 헌신과 존중의 리더십으로 세계가 인정하는 고려대학교를 만들겠습니다.",
    pillars: [
      {
        title: "세계를 선도하는 연구의 대학",
        body: "세계적 석학 영입과 국제 공동연구를 넓히고 AI 기반 연구 인프라를 갖춰, 고려대학교에서 세계를 선도하는 연구가 나오게 하겠습니다.",
        pledges: pledges(`
          1-8 우수 석학 제도 개선
          1-9 World Class 석학 특별채용 프로그램 도입
          1-10 산업체 Chaired Professor 제도 활성화
          1-11 국제 공동연구 Seed Fund의 글로벌 대형연구 연계
          1-12 AI 기반 연구 인프라 구축 및 KU AI-RG 도입
          1-13 석탑기금교수
        `),
      },
      {
        title: "세계를 향해 열린 교육의 대학",
        body: "세계 정상급 대학과의 교육협력을 넓히고 학생들의 위대한 도전을 지원하며, 더 넓은 무대에서 배우고 성장하도록 교육의 지평을 넓히겠습니다. 대학의 지식과 교육자원은 졸업생과 시민, 기업과 사회에 개방하겠습니다.",
        pledges: pledges(`
          2-8 학생들의 '위대한 도전'을 지원하는 대학
          2-10 캠퍼스와 국경을 뛰어넘는 대학
          2-11 대학의 지식이 사회의 힘이 되는 교육
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
        body: "불필요한 절차와 오래된 관행을 걷어내고 AI·디지털 행정을 도입하며, 직원의 전문성과 현장의 아이디어가 혁신으로 이어지게 하겠습니다. 감사실을 준법지원실로 개편하고, 총장 직속 ‘AI 혁신 전략위원회’를 설치하겠습니다.",
        pledges: pledges(`
          4-6 AI·디지털 기반 미래형 행정체계 구축
          4-8 직원 경력 사다리와 전문직무 트랙 구축
          4-10 전문성 기반 보직 운영 확대
          4-11 행정혁신 펀드 신설
          4-13 준법지원실 설치
          4-14 'AI 혁신 전략위원회' 설치
        `),
      },
      {
        title: "세계가 인정하는 품격의 대학",
        body: "누구나 AI를 활용할 수 있고 기후위기에 대응하는 미래형 친환경 캠퍼스를 만들고, 구성원의 지혜를 모아 고등교육을 선도하며 연구와 교육으로 사회에 공헌하겠습니다.",
        pledges: pledges(`
          5-7 친환경 스마트 캠퍼스 구축
          5-9 고등교육을 선도하며 교육과 연구로 사회에 공헌하는 고려대학교
        `),
      },
    ],
  },
];
