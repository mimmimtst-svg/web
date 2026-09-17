# Pirror 디자인 시스템

이 문서는 `2026-Pirror` Figma 디자인을 기반으로 구현된 실제 코드(`app/globals.css`, `components/*`)에서 역추출한 디자인 시스템입니다.
**앞으로 새로운 섹션/페이지/컴포넌트를 추가할 때는 이 문서의 토큰과 패턴을 우선적으로 재사용**하고, 새 값이 꼭 필요할 때만 이 문서에 항목을 추가하세요. 임의의 새 색상·폰트 크기·radius를 즉흥적으로 만들지 않는 것이 원칙입니다.

---

## 0. 디자인 원칙

- **모던하고 정돈되며 절제된 톤.** 공공기관 홈페이지처럼 딱딱하지 않되, 캐주얼하게 풀어지지도 않는다.
- **콘텐츠가 주인공.** 장식은 Figma에 있는 것만 사용한다.
- 다음은 **임의로 추가하지 않는다** (명시적으로 요청받은 경우가 아니면):
  - 과도한 gradient
  - 불필요하게 둥근 카드 (radius는 아래 `--radius-*` 토큰 범위 안에서만)
  - 의미 없는 glow / blur 효과
  - 과도하게 큰 타이포 (아래 타입 스케일 범위를 벗어나는 크기)
  - Figma에 없는 장식 요소
  - 모든 정보를 카드 안에 우겨넣는 구성
- 예외: Figma 콘텐츠/구조는 유지하되, **카드류의 시각 디자인은 이 시스템에 맞게 모던화**해도 된다 (Section 4 카드가 그 예). 단, 텍스트·제목·데이터는 임의로 수정·요약하지 않는다.
- 실제 이미지/아이콘 에셋만 사용한다. Figma에서 가져올 수 없는 경우 placeholder로 슬쩍 대체하지 말고, 먼저 사용자에게 알린다.

---

## 1. 컬러 시스템

토큰은 `app/globals.css`의 `:root`에 정의되어 있다. 새 색상이 필요하면 여기에 먼저 추가한다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-key` | `#8B0029` (Crimson) | 브랜드 포인트 컬러. 푸터 배경, 카드 내 강조 넘버("01" 등), 체크 아이콘 |
| `--color-key-dark` | `#6F0121` | key 컬러의 hover/active 등 짙은 변형 (예비) |
| `--color-black` | `#000000` | 섹션 타이틀, 구분선(`section-line`) |
| `--color-white` | `#FFFFFF` | 밝은 배경 위 카드, 다크 섹션 위 텍스트 |
| `--color-charcoal` | `#2C2C2C` | 카드/리스트 본문 텍스트 |
| `--color-charcoal-30` | `rgba(44,44,44,0.3)` | 타이틀 내 구분자 `|` 등 옅은 보조 텍스트 |
| `--color-card-bg` | `#F1EEE8` (Pampas) | Section 2 카드 배경 |
| `--color-line` | `#333333` | 카드 내부 얇은 구분선, "자세히 보기" 텍스트 컬러 |
| `--color-label` | `#77868C` (Rolling Stone) | 카테고리 라벨(예: "나답게 | 대학의 본질 회복") |
| `--color-muted` | `#AEA89B` (Napa) | Section 3 구분선, "자세히 보기" 텍스트(다크 배경 위) |
| `--color-light-gray` | `#D9D9D9` (Alto) | Section 3/4 헤딩 텍스트 컬러 (다크 배경 위) |
| `--color-overlay` | `rgba(41,33,33,0.82)` | 사진 배경 위 다크 오버레이 (Section 3) |
| 플러스 아이콘 컬러 | `#ABB8C3` (Section 3) / `#F4F2ED` (Section 4) | 섹션별로 다름 — 헤딩 텍스트 컬러와 동일하지 않으니 주의 |
| Section 4 배경 | `#141414` | 카드 슬라이더 섹션 전용 다크 배경 (토큰화되어 있지 않음 — 필요시 `--color-carousel-bg`로 승격) |

> 새 섹션 배경/포인트 컬러가 필요하면 Figma의 정확한 hex를 `get_variable_defs` / `get_design_context`로 확인 후 토큰으로 추가한다. 임의로 유사 색을 눈대중으로 만들지 않는다.

---

## 2. 타이포그래피

### 폰트 패밀리
모두 **npm 패키지로 self-host** (외부 CDN 호출 없음 → 네트워크 제약 환경에서도 안전, 빌드 재현성 보장).

| 토큰 | 폰트 | 패키지 | 용도 |
|---|---|---|---|
| `--font-kr` | Pretendard Variable | `pretendard` | 국문 본문/제목 전반 (기본 폰트) |
| `--font-en` | Inter | `@fontsource/inter` | 버튼/숫자류 영문 (예: "자세히 보기" 화살표 옆 텍스트, Section 3 "첫째," 숫자) |
| `--font-mono` | Space Mono | `@fontsource/space-mono` | 푸터 "E-MAIL" 라벨 등 캡션성 mono 텍스트 |

새 굵기가 필요하면 `pretendard`(variable, `font-weight` 100~900 임의 지정 가능) 또는 `@fontsource/inter/700.css`처럼 필요한 weight CSS를 `app/globals.css` 상단에 `@import` 한다.

### 타입 스케일 (fluid, `clamp()`)

모든 크기는 **390px 뷰포트 값 → 1920px 뷰포트 값**으로 흐르도록 `clamp(min, 계산식, max)`로 정의되어 있다. 새 텍스트 스타일이 필요하면 아래 패턴을 따라 min/max를 정하고 토큰을 추가한다.

| 토큰 | 390px → 1920px | 사용처 |
|---|---|---|
| `--fs-hero-kr` | 32px → 90px | 히어로 국문 헤드라인 |
| `--fs-hero-en` | 22px → 70px | 히어로 영문 서브헤드라인 |
| `--fs-section-title` | 24px → 39.9px | 섹션 대제목 ("유병현의 발전계획 3대 체계" 등) |
| `--fs-card-title` | 20px → 28px | 카드 제목(굵게) |
| `--fs-card-title-sub` | 16.8px → 22px | 카드 부제 |
| `--fs-card-desc` | 15.2px → 20px | 카드 본문 |
| `--fs-btn` | 13.5px 고정 | "자세히 보기" 등 버튼/링크 텍스트 |
| `--fs-promise-num` | 24px → 40px | Section 3 "첫째," 넘버링 |
| `--fs-promise-title` | 18.4px → 28px | Section 3 각 항목 제목 |
| `--fs-promise-body` | 15.2px → 18px | Section 3 각 항목 본문 |
| `--fs-small` | 14px 고정 | 푸터 카피라이트 |
| `--fs-xsmall` | 12px → 13.6px | Section 4 카드 카테고리 라벨 |
| `--fs-header-name` | 20px → 30px | 헤더 "유병현" |
| `--fs-header-label` | 12.8px → 18px | 헤더 직함 라벨 |
| `--fs-plan-item` | 15.2px → 20px | Section 4 카드 리스트 아이템 |

**새 스케일 추가 공식**:
```
slope = (max - min) / 1530        /* 1530 = 1920 - 390 */
intercept = min - slope * 390
--fs-token: clamp(minREM, calc(interceptPX + slope*100 vw), maxREM);
```
(rem 기준 16px = 1rem)

### 굵기(weight) 사용 패턴
- ExtraBold(800): 히어로 국문 헤드라인, 헤더 이름
- Bold/SemiBold(700/600): 카드 제목, Section 3 항목 제목, Section 3 "첫째," 숫자(Inter 700)
- Regular(400): 섹션 제목, 카드 부제, 라벨
- Light(300): 히어로 영문, 카드/Promise 본문

---

## 3. 스페이싱 & 레이아웃

| 토큰 | 390px → 1920px | 용도 |
|---|---|---|
| `--space-page-x` | 20px → 40px | 섹션 좌우 패딩 (모든 섹션 공통) |
| `--space-section-y` | 48px → 80px | 섹션 상하 패딩 |
| `--gap-lg` | 24px → 80px | 히어로 헤드라인-포트레이트 간격 등 큰 간격 |
| `--gap-md` | 16px → 40px | 카드 슬라이더 카드 간격 등 |
| `--gap-sm` | 10px → 20px | 카드 그리드 간격, 헤더 요소 간격 |
| `--content-max` | 1920px | 콘텐츠 wrapper 최대 너비 (그 이상 와이드 화면에서 중앙 정렬) |
| `--radius-card` | 10px | Section 2 카드 라운드 (Figma 원본 값) |
| `--header-height` | **100px 고정** (fluid 아님), `Header.tsx`가 실측 높이로 재확인 | 고정 헤더 높이. 스냅 섹션의 top padding 계산에 사용 (4.8 참고) |

> `--space-section-y`(40px)와 `--gap-lg`(85px)의 최댓값은 Figma 1920 프레임에서 실측한 값이다 (섹션 상하 여백 40px, 타이틀→콘텐츠 간격 85px). 임의로 더 크게 잡지 않는다 — 예전에 80px/48px로 더 크게 잡았다가 레이아웃이 화면마다 잘리는 문제가 있었다.

### 레이아웃 규칙
- **고정 1920px 레이아웃 금지.** 모든 컨테이너는 `max-width: var(--content-max); margin: 0 auto;` + `padding: 0 var(--space-page-x)` 패턴.
- 섹션 높이는 **`min-height: 100dvh`가 기본**이다 (`100svh`/`100vh` 대신 `100dvh` 우선 — 모바일 주소창 높이 변화 대응). 콘텐츠가 한 화면보다 많으면 섹션이 자연스럽게 늘어나고, 다음 섹션으로 넘어가려면 그만큼 더 스크롤하면 된다 — **이걸 막으려고 `height: 100dvh`로 고정해서 내부 폰트/여백을 억지로 욱여넣지 않는다.** (실제로 이 방식을 썼다가 화면마다 레이아웃이 잘리는 버그가 났었다.) 아주 예외적으로 콘텐츠 양이 확정적이고 한 화면에 반드시 맞춰야 하는 경우에만 `height: 100dvh` + 내부 축소를 고려하되, 먼저 사용자에게 이 트레이드오프를 확인한다.
- 가로 스크롤 발생 금지. **`overflow-x: hidden`은 반드시 `body`에만 건다 (`html`에는 걸지 않는다)** — `html`에 걸면 이 프로젝트가 쓰는 Chromium 빌드에서 `scroll-snap-type`이 조용히 무시되는 버그가 있다 (실측으로 확인됨). 새 컴포넌트가 가로 스크롤 규칙을 깨지 않는지 `document.documentElement.scrollWidth === clientWidth`로 확인.
- 브레이크포인트 기준: **1920 / 1440 / 1024 / 768 / 390**. 실제 CSS 분기점은 컴포넌트 CSS Module 안에 `@media (max-width: 1023px)`, `@media (max-width: 640px)` 형태로 존재. 다단 그리드는 1024 이하에서 2열, 640 이하에서 1열로 재배치하는 것이 기본 패턴 (`DevelopmentPlan.module.css` 참고).

---

## 4. 컴포넌트 패턴

새 컴포넌트를 만들 때는 기존 컴포넌트 중 가장 가까운 패턴을 복제해서 시작한다.

### 4.1 섹션 헤더 (`heading` 패턴)
- 모든 섹션이 동일한 패턴을 쓴다: `+` 아이콘(`PlusIcon`) + 제목 텍스트, 밑줄 없음. 아이콘/텍스트 색은 섹션 배경에 맞춰 바꾼다 — 흰 배경(`DevelopmentPlan`)은 `--color-charcoal`, 다크 배경(`Promises`)은 아이콘 `#ABB8C3`/텍스트 `--color-light-gray`, `PolicyCarousel`은 아이콘 `#F4F2ED`/텍스트 `--color-white`. (예전엔 `DevelopmentPlan`만 아이콘 없이 밑줄 스타일이었지만, Figma가 세 섹션 모두 이 아이콘+텍스트 패턴으로 통일되어 코드도 맞췄다.)
- 제목 폰트 크기: `--fs-section-title`, weight 400, `text-transform: uppercase`(국문에는 영향 없음, 영문 대비용으로 유지)

### 4.2 카드
- **콘텐츠 카드** (`DevelopmentPlan`): 배경 `--color-card-bg`, radius `--radius-card`(10px), 상단 텍스트 + 하단 이미지(`aspect-ratio` 고정, `object-fit: cover`)
- **데이터 카드** (`PolicyCarousel`): 흰 배경, radius 14px(모던화 허용 범위), 상단 넘버+제목(key 컬러), 카테고리별 체크리스트, 하단 링크. **텍스트/구조는 Figma 그대로, 비주얼만 모던화된 예시**이므로 향후 카드형 콘텐츠 추가 시 이 패턴을 기본값으로 쓴다.

### 4.3 버튼 / 링크
- **Pill 버튼** (Contact Us): `border: 1px solid`, `border-radius: 999px`, hover 시 배경/글자색 반전
- **텍스트 링크** ("자세히 보기"): `--font-en`, `--fs-btn`(13.5px), 화살표 아이콘(`ArrowRightIcon`) 동반, 배경 톤에 따라 색만 다르게(`--color-line` / `--color-muted`)
- **원형 아이콘 버튼** (캐러셀 prev/next): `border: 1px solid`, `border-radius: 999px`, hover 시 반전, `:disabled`일 때 `opacity: 0.3`

### 4.4 가로 스크롤 캐러셀 (`PolicyCarousel`)
새로운 가로 스크롤 콘텐츠가 필요하면 이 패턴을 재사용:
- `overflow-x: auto` + `scroll-snap-type: x proximity` + `scrollbar-width: none`(스크롤바 숨김)
- 상단 우측에 prev/next 버튼 2개, `scrollBy({ left, behavior: 'smooth' })`로 카드 1장 단위 이동
- 버튼은 스크롤 위치에 따라 `disabled` 처리 (`scroll` 이벤트로 시작/끝 감지)
- `"use client"` 컴포넌트로 분리 (인터랙션이 있는 부분만 클라이언트 컴포넌트화, 나머지는 서버 컴포넌트 유지)

### 4.5 아이콘 (`components/icons.tsx`)
- 전부 Figma에서 추출한 **실제 SVG path**를 `fill="currentColor"` / `stroke="currentColor"`로 변환한 React 컴포넌트
- 새 아이콘이 필요하면: ① Figma에서 `get_design_context` 또는 `download_assets`로 원본 SVG 확보 → ② path만 추출 → ③ `currentColor`로 치환 → ④ `icons.tsx`에 함수 추가. 색은 부모 CSS의 `color` 속성으로 제어(하드코딩 금지, 컨텍스트별로 색이 다르기 때문).

### 4.6 이미지
- 모두 실제 Figma 원본 에셋 (`public/images/`), placeholder 금지
- 배경형 이미지: `position: absolute; inset: 0; object-fit: cover;` + 필요시 다크 오버레이(`--color-overlay`)
- 카드형 이미지: `aspect-ratio` 고정 + `object-fit: cover` (원본 비율이 달라도 크롭으로 흡수)
- **컬러 멀티플라이 블렌딩**(Hero 배경 패턴): 이미지 자체의 투명도를 낮추는 방식(❌)이 아니라, 이미지 뒤에 브랜드 컬러 배경을 깔고 이미지에 `mix-blend-mode: multiply`를 적용해 실제 블렌딩한다(✅). 패턴:
  ```css
  .section { background-color: var(--color-key); } /* 색 레이어 */
  .bgImage { position: absolute; inset: 0; object-fit: cover; mix-blend-mode: multiply; }
  ```

### 4.7 고정 헤더 + 스크롤 기반 테마 전환 (`Header.tsx`)
히어로처럼 이미지 위에 오버레이되는 투명 헤더가 필요한 페이지에서 재사용하는 패턴:
- `position: fixed; top:0; z-index:40;`, 기본 상태는 `background-color: transparent; color: var(--color-white);`
- **스크롤 리스너를 쓰지 않는다.** 히어로(`#hero`) 요소를 `IntersectionObserver`로 관찰하고, `rootMargin: -{headerHeight}px 0px 0px 0px`로 헤더 높이만큼의 감지선을 만들어 히어로가 그 선 아래로 내려가면(`isIntersecting === false`) `.scrolled` 클래스를 토글한다. `scroll` 이벤트 리스너 + `getBoundingClientRect()`를 매 프레임 읽는 방식은 스크롤 스냅 애니메이션과 메인 스레드를 두고 경쟁해 끊김을 유발하므로 쓰지 않는다.
- 전환은 `transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;`
- 자식 요소(브랜드 텍스트, 버튼, 아이콘)는 색을 하드코딩하지 않고 전부 `color: inherit` / `border-color: currentColor`로 상속받아야 상태 전환이 한 번에 적용된다.
- `ResizeObserver`로 헤더의 실제 렌더링 높이를 재서 `--header-height` CSS 변수에 반영하고, 그 값이 바뀔 때마다 IntersectionObserver도 새 `rootMargin`으로 재생성한다 (fluid 타이포로 헤더 높이가 브레이크포인트마다 달라지기 때문).

### 4.8 전체 페이지 스크롤 스냅
`Section 1~4`(`<section>` 태그, `Footer`는 Section 4 내부로 병합 — 4.10 참고)는 화면 단위로 스냅된다:
- `html { scroll-snap-type: y mandatory; }` (**`body`가 아니라 `html`**에 건다 — 이 프로젝트의 실제 스크롤 컨테이너는 `html`)
- 각 섹션: `scroll-snap-align: start;` 만 건다. **`scroll-snap-stop: always`는 쓰지 않는다** — 강하게 스크롤했을 때 섹션마다 무조건 멈추게 만들어서 전환이 뻑뻑하고 덜 매끄럽게 느껴진다는 피드백을 받고 뺐다. `start`만으로도 각 섹션의 시작 지점에 정확히 스냅되고, 대신 빠르게 스크롤하면 여러 섹션을 자연스럽게 지나칠 수 있다.
- **`html`에 `scroll-behavior: smooth`를 절대 걸지 않는다.** `scroll-snap-type`과 같은 요소에 같이 걸면 브라우저가 휠 입력의 smooth 보간과 스냅 보정 애니메이션을 이중으로 실행해서, 트랙패드의 연속된 wheel 이벤트가 누적되며 스냅 지점을 오버슈트했다가 다시 튕겨오는 "이중 움직임"이 생긴다. 이게 실측으로 확인된 버벅임의 주 원인이었다. 앵커 링크 점프 등 smooth가 필요한 곳은 JS `scrollIntoView({behavior:'smooth'})`처럼 스냅과 무관한 개별 호출로 처리하고, `html` 전역에는 절대 걸지 않는다.
- 고정 헤더에 가려지지 않도록, **`scroll-margin-top`으로 스크롤 위치를 밀지 않는다.** 대신 **섹션 자신의 `padding-top`에 헤더 높이를 포함**시킨다 (히어로 제외 — 히어로는 헤더가 투명이라 그대로 유지). `scroll-margin-top`은 섹션이 `height: 100dvh`처럼 고정 높이일 때 바닥을 뷰포트 밖으로 밀어내는 부작용이 있어서 쓰지 않는다.
- JS로 wheel 이벤트를 가로채거나 `scrollTo()`/`scrollIntoView()`로 스크롤 위치를 강제 이동시키지 않는다 — 순수 CSS 스냅만 사용
- ⚠️ **`overflow-x: hidden`을 `html`에 걸면 스냅이 깨진다** (위 레이아웃 규칙 참고). 새 페이지에서 스냅이 갑자기 안 먹힌다면 이 규칙부터 의심한다.
- 새 스냅 섹션을 추가할 컴포넌트 CSS에 그대로 복사할 스니펫:
  ```css
  .section {
    min-height: 100dvh;
    padding: calc(var(--header-height) + var(--space-section-y)) var(--space-page-x)
      var(--space-section-y); /* 헤더 높이 + 여백을 top padding에 포함 */
    scroll-snap-align: start;
  }
  ```

### 4.9 (결번 — 이전에 있던 "짧은 뷰포트에서 강제로 한 화면에 우겨넣기" 전략은 4.8의 `min-height` 기본 정책으로 대체되어 제거됨)

### 4.10 마지막 섹션에 Footer 통합하기
Footer가 스크롤 스냅에서 별도의(도달하기 어려운) 스냅 영역이 되지 않도록, 마지막 콘텐츠 섹션(`PolicyCarousel`)이 자신의 `<section>` 안에서 `<Footer />`를 직접 렌더링한다 (`app/page.tsx`는 더 이상 `<Footer />`를 별도로 렌더링하지 않는다).
```
.section { min-height: 100dvh; display: flex; flex-direction: column; }
.headerWrap { flex: 0 0 auto; }   /* 제목 줄 + prev/next 버튼 줄 (4.12 참고) */
.trackOuter { flex: 1 1 auto; }   /* 가로 스크롤 카드 트랙 */
footer      { flex: 0 0 auto; }   /* Footer.module.css 쪽, scroll-snap-align 없음 */
```
섹션이 한 화면을 다 못 채우면 Footer가 자연스럽게 화면 하단에 붙고, 카드가 많아 한 화면을 넘으면 Footer를 보기 위해 조금 더 스크롤하면 된다 — 강제로 맞추지 않는다.

### 4.11 히어로 2/3·1/3 비대칭 레이아웃 (엣지 정렬 이미지)
텍스트가 좌측 2/3, 인물/제품 이미지가 우측 1/3을 섹션의 실제 가장자리(오른쪽·하단)에 여백 없이 맞닿게 배치하는 패턴:
- 텍스트는 패딩이 있는 `.inner` 컨테이너 안에 두고 `width: 66.66%`
- 이미지는 `.inner`가 아니라 **섹션 자체의 직계 자식**으로 두고 `position: absolute; right:0; bottom:0;` (패딩된 컨테이너 안에 두면 그 패딩만큼 가장자리에서 밀려나므로 반드시 섹션 바로 아래에 배치)
- 원본 이미지를 좌우 반전해야 하면 `transform: scaleX(-1)`을 이미지 자체에 적용 (컨테이너에는 걸지 않는다)
- 1024px 미만에서는 절대 위치를 해제하고(`position: static`) 텍스트 아래로 자연스럽게 쌓는다 — 겹침 방지

### 4.12 엣지-투-엣지 스와이프 캐러셀 (`PolicyCarousel`)
카드가 화면 가장자리까지 닿아서 "옆으로 더 있다"는 걸 시각적으로 알려주는 가로 캐러셀 패턴:
- 제목 줄과 prev/next 버튼 줄은 **서로 다른 행**으로 분리하고(Figma가 그렇게 되어 있다 — 같은 행에 나란히 두지 않는다), 둘 다 `max-width: var(--content-max)` + `padding: 0 var(--space-page-x)`로 감싼 `.headerWrap` 안에 둔다.
- 카드 트랙만 **그 padding 밖으로 뺀다**: `.trackOuter`는 `width:100%`(제약 없음), `.track` 자체에 `padding: 0 var(--space-page-x)`를 걸어서 카드가 화면 진짜 가장자리까지 스크롤되지만 쉬는 위치에서는 첫 카드가 본문 여백과 맞춰 보이게 한다.
- 스크롤은 세 가지 입력을 모두 지원한다: 버튼 클릭(`scrollBy({behavior:'smooth'})`), 트랙패드/터치(네이티브 `overflow-x:auto`), **마우스 클릭 드래그**(`onPointerDown/Move/Up`로 `scrollLeft`를 직접 갱신). 드래그 중에는 `.track`에 `scroll-behavior: smooth`를 걸지 않는다 — 걸려 있으면 매 `mousemove`마다 애니메이션이 끼어들어 드래그가 끈적하게 느껴진다(smooth는 버튼 클릭의 `scrollBy` 호출에만 inline 옵션으로 준다).
- `cursor: grab` (드래그 중엔 `grabbing`)으로 스와이프 가능함을 알려준다.

### 4.13 6-컬럼 그리드로 텍스트를 오른쪽에 정렬하기 (`Promises`)
"첫째, 둘째, 셋째"처럼 구분선은 전체 폭을 채우지만 텍스트 그룹은 화면 오른쪽에 붙어야 하는 레이아웃:
```css
.item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: var(--gap-sm); /* 40px 마진 안에서 20px 간격 6컬럼 */
}
.itemNumber { grid-column: 3 / 4; text-align: right; }
.itemBody   { grid-column: 4 / 7; }
```
넘버가 자기 컬럼 안에서 `text-align:right`로 오른쪽 붙기 때문에, 넘버 텍스트와 본문 사이에 큰 여백이 자동으로 생긴다(컬럼 폭 - 텍스트 폭만큼) — 이 여백을 `gap`으로 억지로 만들지 않는다. 1024px 미만에서는 그리드를 풀고 세로 스택으로 바꾼다.

### 4.14 스크롤 등장 애니메이션 (`components/Reveal.tsx`)
새로 등장할 때 fade + 위로 슬라이드되는 요소는 전부 이 컴포넌트로 감싼다. 절대 새 애니메이션 라이브러리(GSAP 등)를 설치하지 않고 `IntersectionObserver` + CSS transition만 쓴다.
```tsx
<Reveal as="li" className={styles.card} delay={index * 100}>...</Reveal>
```
- `as`로 실제 렌더링할 태그를 지정한다(그리드/리스트의 직계 자식이어야 할 때 `li`처럼 지정 — 불필요한 wrapper `div`를 만들지 않기 위함).
- 한 번 보이면 옵저버가 `disconnect()`되어 다시 숨겨지지 않는다(스크롤을 왔다갔다해도 재생 안 됨).
- `delay`(ms)로 리스트 아이템을 스태거링한다. `distance`(기본 24px)로 슬라이드 거리를 조절한다(Section 3처럼 더 크게 "아래에서 위로" 보이려면 40 정도).
- 이 컴포넌트는 **스크롤 위치를 읽거나 바꾸지 않는다** — `entry.isIntersecting`만 보고 클래스를 토글하므로 4.8의 scroll-snap과 절대 충돌하지 않는다.
- `app/globals.css`의 `.revealHidden`/`.revealVisible`가 실제 스타일(opacity/transform)을 담당하고, `@media (prefers-reduced-motion: reduce)`에서 자동으로 무효화된다.
- 히어로 타이틀처럼 **스크롤 트리거 없이 로드 즉시** 페이드인해야 하면 Reveal을 쓰지 말고 CSS `@keyframes` + `animation`을 직접 건다 (`Hero.module.css`의 `heroFadeIn` 참고) — IntersectionObserver를 굳이 쓸 이유가 없다.
- **JS 없는 환경 대비**: `revealHidden`은 SSR 시 이미 `opacity:0`으로 렌더링되므로, `app/layout.tsx`의 `<noscript>` 블록이 JS가 없을 때 강제로 보이게 처리한다. 새로운 스크롤-트리거 애니메이션을 추가해도 이 안전장치는 그대로 유효하다.

### 4.15 hover 인터랙션
- **카드** (`DevelopmentPlan`, `PolicyCarousel`): `transform: translateY(-6px)` + `box-shadow`, `transition: 300ms cubic-bezier(0.16,1,0.3,1)`. 카드 안 이미지가 있으면 `transform: scale(1.04)`도 같이 (별도 `transition-duration` 500ms로 조금 더 느리게).
- **"자세히 보기" 류 링크** (`cardLink`, `itemLink`): `gap`을 8px→9px 정도로 늘려서 화살표가 살짝 앞으로 나가는 느낌 + `color`를 포인트 컬러로 전환. `transition: gap 200ms ease, color 200ms ease;`
- 전부 `@media (prefers-reduced-motion: reduce)`에서 `transform` 애니메이션은 끈다(그림자/색 전환은 순간적이라 굳이 끄지 않아도 됨).

---

## 5. 코드 컨벤션

- **스타일링**: CSS Modules (`*.module.css`), Tailwind 미사용
- **토큰 위치**: 전역 디자인 토큰은 전부 `app/globals.css`의 `:root`에만 정의. 컴포넌트 CSS에서 매직 넘버 대신 토큰(`var(--...)`)을 우선 사용하고, 정말 그 컴포넌트에만 쓰이는 값일 때만 로컬 값 허용.
- **컴포넌트 구조**: `components/ComponentName.tsx` + `components/ComponentName.module.css` 1:1 매칭. 텍스트/리스트형 데이터는 `lib/policyData.ts`처럼 컴포넌트 밖으로 분리.
- **서버/클라이언트 컴포넌트**: 인터랙션(스크롤, 상태 등)이 필요한 컴포넌트만 `"use client"`. 나머지는 기본 서버 컴포넌트로 유지.
- **폰트**: 새 폰트 필요 시 반드시 npm 패키지(self-host)로 추가. Google Fonts/CDN `<link>` 직접 삽입 금지(네트워크 제약 환경 대응, 빌드 안정성).

---

## 6. 새 디자인 추가 시 체크리스트

1. Figma 소스를 먼저 확인(`get_design_context`)하고, 이 문서에 대응하는 토큰이 있는지 확인한다.
2. 색상/타이포/spacing은 **기존 토큰을 재사용**한다. 새 값이 꼭 필요하면 위 표에 추가하고 이 문서를 갱신한다.
3. 좌우 패딩 `--space-page-x`, 콘텐츠 wrapper `max-width: var(--content-max)` 패턴을 따른다. 화면 단위로 스냅되어야 하는 섹션이면 4.8의 스니펫(`min-height:100dvh` + 헤더 높이를 포함한 `padding-top`)을 그대로 적용한다 — `height`로 고정하지 않는다.
4. 1024 / 640 분기 기준으로 다단 → 스택 반응형을 기본으로 검토한다(필요시 768 분기 추가).
5. 이미지·아이콘은 전부 실제 에셋만 사용한다. 구할 수 없으면 사용자에게 먼저 알린다.
6. 과한 그라디언트/글로우/불필요한 둥근 카드/장식 요소를 새로 추가하지 않는다.
7. `html`에 `scroll-behavior: smooth`를 걸지 않고, 섹션에 `scroll-snap-stop: always`도 걸지 않는다 (4.8 참고 — 둘 다 스냅을 뻑뻑하게 만든 원인이었다). 스크롤 위치를 읽어야 하는 컴포넌트는 `scroll` 리스너보다 `IntersectionObserver`를 우선 검토한다 (4.7 참고).
8. 등장 애니메이션이 필요하면 새 라이브러리를 깔지 말고 `components/Reveal.tsx`를 재사용한다 (4.14). hover 인터랙션은 4.15의 값(카드 lift, 링크 gap)을 기본값으로 삼는다.
9. 작업 후 `npm run lint && npm run build`로 검증하고, 최소 1개 데스크톱 + 1개 모바일 뷰포트로 스크린샷 확인한다. 가로 스크롤 발생 여부(`document.documentElement.scrollWidth === clientWidth`)와, 한 줄로 강제한 텍스트가 있다면 `element.scrollWidth > element.clientWidth`(줄바꿈/잘림 여부)를 실측한다. `fullPage` 스크린샷은 `IntersectionObserver` 기반 등장 애니메이션을 제대로 트리거하지 않을 수 있으니, Reveal 요소 확인은 실제 `scrollTo` 반복으로 검증한다.
