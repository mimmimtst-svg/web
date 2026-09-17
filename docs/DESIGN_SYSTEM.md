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
| `--header-height` | 기본값 96px, `Header.tsx`가 실측 높이로 실시간 갱신 | 고정 헤더 높이. 스냅 섹션의 top padding 계산에 사용 (4.8 참고) |

### 레이아웃 규칙
- **고정 1920px 레이아웃 금지.** 모든 컨테이너는 `max-width: var(--content-max); margin: 0 auto;` + `padding: 0 var(--space-page-x)` 패턴.
- 섹션 높이는 `100svh`/`100vh` 대신 `100dvh` 우선 (모바일 주소창 높이 변화에 대응). **데스크톱(> 640px)에서 화면에 정확히 맞아야 하는 스냅 섹션은 `height: 100dvh`(고정)를 쓰고 내부 콘텐츠를 4.9의 방식으로 축소**하며, 그 외/모바일은 `min-height: 100dvh`로 콘텐츠가 넘치면 자연스럽게 늘어나게 한다. `min-height`와 `height`를 같은 요소에 동시에 걸지 않는다 (중복되면 항상 더 큰 쪽으로 늘어난다).
- 가로 스크롤 발생 금지. **`overflow-x: hidden`은 반드시 `body`에만 건다 (`html`에는 걸지 않는다)** — `html`에 걸면 이 프로젝트가 쓰는 Chromium 빌드에서 `scroll-snap-type`이 조용히 무시되는 버그가 있다 (실측으로 확인됨). 새 컴포넌트가 가로 스크롤 규칙을 깨지 않는지 `document.documentElement.scrollWidth === clientWidth`로 확인.
- 브레이크포인트 기준: **1920 / 1440 / 1024 / 768 / 390**. 실제 CSS 분기점은 컴포넌트 CSS Module 안에 `@media (max-width: 1023px)`, `@media (max-width: 640px)` 형태로 존재. 다단 그리드는 1024 이하에서 2열, 640 이하에서 1열로 재배치하는 것이 기본 패턴 (`DevelopmentPlan.module.css` 참고).

---

## 4. 컴포넌트 패턴

새 컴포넌트를 만들 때는 기존 컴포넌트 중 가장 가까운 패턴을 복제해서 시작한다.

### 4.1 섹션 헤더 (`sectionHeader` / `heading` 패턴)
- 두 가지 변형이 존재:
  1. **라이트 섹션**: 제목 텍스트만 + 아래 1px 블랙 라인 (`DevelopmentPlan`)
  2. **다크 섹션**: `+` 아이콘(`PlusIcon`) + 제목 텍스트, 라인 없음 (`Promises`, `PolicyCarousel`)
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
- 각 섹션: `scroll-snap-align: start; scroll-snap-stop: always;`
- **`html`에 `scroll-behavior: smooth`를 절대 걸지 않는다.** `scroll-snap-type`과 같은 요소에 같이 걸면 브라우저가 휠 입력의 smooth 보간과 스냅 보정 애니메이션을 이중으로 실행해서, 트랙패드의 연속된 wheel 이벤트가 누적되며 스냅 지점을 오버슈트했다가 다시 튕겨오는 "이중 움직임"이 생긴다. 이게 실측으로 확인된 버벅임의 주 원인이었다. 앵커 링크 점프 등 smooth가 필요한 곳은 JS `scrollIntoView({behavior:'smooth'})`처럼 스냅과 무관한 개별 호출로 처리하고, `html` 전역에는 절대 걸지 않는다.
- 고정 헤더에 가려지지 않도록, **`scroll-margin-top`으로 스크롤 위치를 밀지 않는다.** 그 방식은 섹션의 실제 박스 높이(`100dvh`)에 헤더 높이만큼을 더 스크롤해야 하는 상태를 만들어 섹션 바닥이 뷰포트 아래로 밀려 잘리는 문제를 일으킨다. 대신 **섹션 자신의 `padding-top`에 헤더 높이를 포함**시켜 박스 총 높이는 `100dvh`를 유지한 채 콘텐츠만 헤더 아래로 내려오게 한다 (히어로 제외 — 히어로는 헤더가 투명이라 그대로 유지).
- JS로 wheel 이벤트를 가로채거나 `scrollTo()`/`scrollIntoView()`로 스크롤 위치를 강제 이동시키지 않는다 — 순수 CSS 스냅만 사용
- ⚠️ **`overflow-x: hidden`을 `html`에 걸면 스냅이 깨진다** (4.6 위 레이아웃 규칙 참고). 새 페이지에서 스냅이 갑자기 안 먹힌다면 이 규칙부터 의심한다.
- 새 스냅 섹션을 추가할 컴포넌트 CSS에 그대로 복사할 스니펫 (데스크톱에서 한 화면에 정확히 맞춰야 하는 섹션 기준):
  ```css
  .section {
    height: 100dvh; /* min-height가 아니라 height — 콘텐츠는 아래 4.9로 안에서 줄인다 */
    display: flex;
    flex-direction: column;
    padding: calc(var(--header-height) + var(--space-section-y)) var(--space-page-x)
      var(--space-section-y); /* 헤더 높이 + 여백을 top padding에 포함 */
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  @media (max-width: 640px) {
    .section {
      height: auto;
      min-height: 100dvh; /* 모바일은 콘텐츠가 늘어나도 되므로 min-height로 복귀 */
    }
  }
  ```

### 4.9 짧은 데스크톱 뷰포트(1366×768 등)에서 한 화면에 맞추기
섹션이 `height: 100dvh`(고정)를 쓰면, 화면이 낮은 노트북에서는 내부 콘텐츠가 스스로 줄어들어야 한다 — 섹션에 `overflow: hidden`을 걸어 콘텐츠를 잘라내는 방식은 쓰지 않는다.
- `app/globals.css`에 `@media (max-height: 820px)`, `@media (max-height: 700px)` 두 단계로 `--space-section-y`, `--gap-lg/md/sm`, `--fs-section-title`를 다시 정의해뒀다. **width 기반 `--space-page-x`는 여기서 건드리지 않는다** (히어로가 이 토큰을 쓰기 때문에 세로 높이 미디어쿼리로 히어로 레이아웃이 흔들리면 안 된다).
- 그래도 안 맞는, 콘텐츠가 유독 많은 요소(카드 리스트 등)는 컴포넌트 CSS에 자체 `@media (max-height: ...)`를 추가해 `font-size`/`padding`/`gap`을 더 줄인다. `PolicyCarousel.module.css`의 `.categoryItem` 축소가 예시 — 실측(Playwright로 `scrollHeight`와 `clientHeight` 비교)해서 실제로 넘치는 뷰포트가 있는지 확인한 뒤 그 구간만 타깃으로 줄였다.
- 정말 줄일 수 없는 긴 본문(예: Section 3의 placeholder 본문)은 `-webkit-line-clamp`로 특정 `max-height` 구간에서만 말줄임 처리한다. 기본 상태(1920/1440)에서는 그대로 전체 노출.
- 검증 방법: 브레이크포인트별로 `section.getBoundingClientRect().height === section.scrollHeight`를 확인 (React가 아니라 브라우저에서 직접 재는 게 정확함).

### 4.10 마지막 섹션에 Footer 통합하기
Footer가 스크롤 스냅에서 별도의(도달하기 어려운) 스냅 영역이 되지 않도록, 마지막 콘텐츠 섹션(`PolicyCarousel`)이 자신의 `<section>` 안에서 `<Footer />`를 직접 렌더링한다 (`app/page.tsx`는 더 이상 `<Footer />`를 별도로 렌더링하지 않는다).
```
.section { height: 100dvh; display: flex; flex-direction: column; }
.inner   { flex: 1 1 auto; min-height: 0; }  /* 제목 + 가로 스크롤 카드 트랙 */
footer   { flex: 0 0 auto; }                  /* Footer.module.css 쪽, scroll-snap-align 없음 */
```
Footer 자체의 상하 패딩도 이 섹션의 세로 예산을 나눠 쓰므로, 다른 곳처럼 폭 기준 `clamp()`가 아니라 높이 기반(`clamp(16px, 2.4vh, 40px)`)으로 줄어들게 되어 있다. 앞으로 이런 "마지막 섹션 + 푸터 통합" 패턴이 다시 필요하면 그대로 재사용한다.

### 4.11 히어로 2/3·1/3 비대칭 레이아웃 (엣지 정렬 이미지)
텍스트가 좌측 2/3, 인물/제품 이미지가 우측 1/3을 섹션의 실제 가장자리(오른쪽·하단)에 여백 없이 맞닿게 배치하는 패턴:
- 텍스트는 패딩이 있는 `.inner` 컨테이너 안에 두고 `width: 66.66%`
- 이미지는 `.inner`가 아니라 **섹션 자체의 직계 자식**으로 두고 `position: absolute; right:0; bottom:0;` (패딩된 컨테이너 안에 두면 그 패딩만큼 가장자리에서 밀려나므로 반드시 섹션 바로 아래에 배치)
- 원본 이미지를 좌우 반전해야 하면 `transform: scaleX(-1)`을 이미지 자체에 적용 (컨테이너에는 걸지 않는다)
- 1024px 미만에서는 절대 위치를 해제하고(`position: static`) 텍스트 아래로 자연스럽게 쌓는다 — 겹침 방지

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
3. 좌우 패딩 `--space-page-x`, 콘텐츠 wrapper `max-width: var(--content-max)` 패턴을 따른다. 화면 단위로 스냅되어야 하는 섹션이면 4.8의 스니펫(데스크톱 `height:100dvh` + 모바일 `min-height:100dvh` 복귀)을 그대로 적용한다.
4. 1024 / 640 분기 기준으로 다단 → 스택 반응형을 기본으로 검토한다(필요시 768 분기 추가).
5. 이미지·아이콘은 전부 실제 에셋만 사용한다. 구할 수 없으면 사용자에게 먼저 알린다.
6. 과한 그라디언트/글로우/불필요한 둥근 카드/장식 요소를 새로 추가하지 않는다.
7. `html`에 `scroll-behavior: smooth`를 걸지 않는다 (4.8 참고 — scroll-snap과 충돌). 스크롤 위치를 읽어야 하는 컴포넌트는 `scroll` 리스너보다 `IntersectionObserver`를 우선 검토한다 (4.7 참고).
8. 작업 후 `npm run lint && npm run build`로 검증하고, 최소 1개 데스크톱(1366x768처럼 짧은 뷰포트 포함) + 1개 모바일 뷰포트로 스크린샷 확인한다. `height:100dvh` 섹션을 추가/수정했다면 `section.getBoundingClientRect().height`와 `section.scrollHeight`가 같은지 실측한다.
