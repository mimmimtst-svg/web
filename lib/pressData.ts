/**
 * 언론 보도 자료 page (app/press): the candidate's columns and press
 * coverage from the booklet (pp. 115–118, from 《언론기고》 on). Each item
 * links to the article; `date` only where the booklet gives one.
 */

export type PressItem = {
  source: string;
  title: string;
  href: string;
  date?: string;
};

export type PressGroup = { title?: string; items: PressItem[] };

/** 언론기고, newest first. */
export const pressColumns: PressItem[] = [
  {
    source: "아시아투데이",
    title: "[특별기고] 왜 지금도 대학에 기부해야 하는가",
    date: "2026.08.09",
    href: "https://share.google/UeiQ2UCgWhQQHNqJ4",
  },
  {
    source: "법률신문",
    title: "의료사고 이력 공개 입법, 의료법제의 기본 방향과 양립할 수 있는가",
    date: "2026.08.08",
    href: "https://share.google/SuIZU4dHsuT8qDfvN",
  },
  {
    source: "한국경제",
    title: "대학은 왜 미래를 위해 저축할 수 없는가",
    date: "2026.07.30",
    href: "https://share.google/QOOtLWuEPAEQXioLx",
  },
  {
    source: "법률신문",
    title: "의료분쟁조정법 개정법률, 의료 행위에 대한 사법 안전망의 첫걸음",
    date: "2026.07.11",
    href: "https://share.google/pZc7qu7ALTwCB7yIv",
  },
  {
    source: "법률신문",
    title: "피라미드형 심급제도 정상화 방안에 찬성한다",
    date: "2015.11.05",
    href: "https://share.google/XD5TKAv1gPQqPoy67",
  },
];

/** 주요 언론보도, in the booklet's order and periods. */
export const pressReports: PressGroup[] = [
  {
    items: [
      {
        source: "의협신문",
        title: "의료사고 이력 공개? 법학계서 '법체계 정합성' 지적",
        href: "https://share.google/xPRBTmqIVESkjh5NQ",
      },
      {
        source: "아시아투데이",
        title:
          "유병현 한국조정학회장 “선의의 의료사고에 형벌·낙인 안돼…의사가 소신껏 메스 잡는 사법안전망 구축해야”",
        href: "https://share.google/tBHWNG0ZmZWw7SCCb",
      },
      {
        source: "청년의사",
        title: "실수로 주사기 재사용도 ‘중대한 과실’?…법학계 “과도한 판결”",
        href: "https://share.google/XQlCat7u1EzuRmXVX",
      },
      {
        source: "청년의사",
        title: "필수의료 살리려 만든 법인데…'12대 중과실' 최대 쟁점",
        href: "https://share.google/P28xacJo4CazwWZL2",
      },
      {
        source: "법률신문",
        title: "한국조정학회·한국인터넷진흥원 공동학술대회 개최",
        href: "https://www.lawtimes.co.kr/news/articleView.html?idxno=222154",
      },
      {
        source: "법률신문",
        title: "한국조정학회 '의료분쟁조정과 민사조정' 정기총회·춘계학술대회 개최",
        href: "https://www.lawtimes.co.kr/news/articleView.html?idxno=218226",
      },
      {
        source: "법률신문",
        title: "한국조정학회·의료중재원 공동 학술대회 개최",
        href: "https://www.lawtimes.co.kr/news/articleView.html?idxno=213487",
      },
      {
        source: "메디파나뉴스",
        title: "'의료 감정', 필수의료를 살릴 핵심 해법으로 부상",
        href: "https://www.medipana.com/news/articleView.html?idxno=402660",
      },
      {
        source: "법률신문",
        title: "한국조정학회 '싱가포르조정협약의 국내 이행과정에 대한 대토론회' 개최",
        href: "https://www.lawtimes.co.kr/news/articleView.html?idxno=207034",
      },
    ],
  },
  {
    title: "대외협력처장 2015.3.~2019.2.",
    items: [
      {
        source: "네이버 블로그",
        title: "[쿱씨뉴스] 기부자들의 정성으로 탄생한 중앙도서관 KU PRIDE CLUB 라운지",
        href: "https://share.google/RLqU5fcLvTnKNu7hS",
      },
      {
        source: "한국경제",
        title: "“고려대에 月 1만원 기부를”…日 와세다大도 벤치마킹",
        href: "https://naver.me/5bRQOriW",
      },
      {
        source: "아주경제",
        title: "고려대, 월 1만원 기부로 56억…“후배 밥값은 선배가 책임진다”",
        href: "https://www.ajunews.com/view/20190130140538478",
      },
      {
        source: "네이버 블로그",
        title: "고대가족들이 만들어낸 “천원의 행복”, 2019에도 계속된다",
        href: "https://m.blog.naver.com/kupride/221434289251",
      },
      {
        source: "베리타스",
        title: "고려대, 내달1일부터 재학생들에게 아침밥 1천원에 제공",
        href: "https://www.veritas-a.com/news/articleView.html?idxno=132398",
      },
      {
        source: "여성소비자신문",
        title: "과일장사하며 모은 전재산 고려대에 기부한 노부부",
        href: "http://m.wsobi.com/news/articleView.html?idxno=66619",
      },
      {
        source: "천지일보",
        title: "고려대, 기부자 초청 ‘크림슨 아너스 클럽 데이’ 연다",
        href: "https://www.newscj.com/news/articleView.html?idxno=575059",
      },
      {
        source: "중앙일보",
        title: "[노트북을 열며] 아이돌 장학금이 불편한 이유",
        href: "https://share.google/vSBeN9Ax0K3JQ3Vcl",
      },
      {
        source: "E동아",
        title: "고려대, KUPC 글로벌 희망장학생 100명 돌파, KU Pride Club 누적 장학생 1000명",
        href: "https://edu.donga.com/news/articleView.html?idxno=30167",
      },
      {
        source: "네이버 블로그",
        title: "재학생 홍보대사들이 만든 KU PRIDE CLUB 마스코트, 쿱씨(KUP'C)",
        href: "https://m.blog.naver.com/kupride/220846841433",
      },
      {
        source: "네이버 블로그",
        title: "[고대투데이] 2015년 겨울호 VOL.63 KU PRIDE CLUB 유병현 기금기획본부장 인터뷰",
        href: "https://share.google/6aO7GJpuXkb4F1Jvv",
      },
      {
        source: "네이버 블로그",
        title: "[비전 선포식] KU-The Future 2016 비전선포식 행사 중 유병현 대외협력처장 KU PRIDE CLUB 안내",
        href: "https://m.blog.naver.com/kupride/220639396012",
      },
      {
        source: "유튜브",
        title: "[고려대학교 KTN] KU-The Future 발전기금 Video Clip",
        href: "https://youtu.be/t1r_8HZB0l4?si=tR1p3FUe8XOR4jck",
      },
      {
        source: "머니투데이",
        title: "고려대, 소액기부 'KU PRIDE CLUB' 1000명 돌파",
        href: "https://naver.me/xZK7KLOV",
      },
      {
        source: "고대신문",
        title: "유병현 처장, 우리 대학이 기부할 가치가 있는 거목임을 알리겠다",
        href: "https://www.kunews.ac.kr/news/articleView.html?idxno=21884",
      },
    ],
  },
  {
    title: "기획예산처장 2012.12.~2015.2.",
    items: [
      {
        source: "매경이코노미",
        title: "[QS 학문분야별 대학평가] 서울대 27개 분야 100위권 고려대 15개·카이스트 10개로 선전",
        href: "https://naver.me/FmGtjbGA",
      },
    ],
  },
];
