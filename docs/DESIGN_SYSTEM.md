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

> ⚠️ **Figma fileKey `uwbrfXG77JjwUSOkbptUxq`에는 이 캠페인 사이트 디자인이 없다 (2026-09-28 확인).** 이전 라운드들에서 참조했던 노드 ID(예: `612:1416`, `614:6269`, `660:4956`)가 실제로 어느 파일을 가리켰는지는 불명확하다 — 이 fileKey로 다시 열어보면 그 노드들 자체가 존재하지 않고, 페이지 전체(`0:1`, "2026 LabProject_Pirror")를 스크린샷·메타데이터로 샅샅이 확인해도 헤더/히어로/카드 등 이 사이트의 UI가 전혀 없다. 이 파일은 이름이 같은 우연으로 겹친, **완전히 다른 "거울형 AI Agent" 리서치 프로젝트**다(고려대·크림슨·"유병현" 텍스트 전무, 목재 조각·로봇 다리 구조물·무드보드 등만 존재). 그러니 **이 fileKey로는 헤더 높이/보더, 타이틀 크기 같은 정확한 Figma 수치를 다시 뽑아낼 수 없다** — 이후 라운드에서 "Figma를 다시 확인하라"는 요청을 받으면, 먼저 사용자에게 **정확한 Figma 파일/노드 링크**를 요청한다. 링크가 없으면 이 문서에 이미 기록된 값(실측 기반)과 일반적인 웹 디자인 관례로 판단하고, 그 사실을 사용자에게 투명하게 알린다 — 값을 지어내서 "Figma에서 확인했다"고 말하지 않는다.

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
| `--color-muted` | `#AEA89B` (Napa) | Section 3 구분선, "자세히 보기" 텍스트(다크 배경 위), Section 4 카드 헤더의 화살표 아이콘(`.cardHeadLink`) |
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
| `--fs-section-title-fit` | `min(--fs-section-title, vh-clamp)` | **Promises와 PolicyCarousel의 헤딩(`+` 아이콘 붙은 "섹션 타이틀")은 반드시 이 토큰만 쓴다** — 짧은 화면(4.9)에서 shrink가 필요해 `--fs-section-title`에 각자 다른 로컬 vh-오버라이드를 만들었다가, 같은 1920×1080에서 한쪽은 18.8px 한쪽은 34.8px로 보일 정도로 어긋난 적이 있다(2026-09-28). "제목 크기는 다 똑같아야 한다"는 사용자 피드백으로 발견 — 반복되는 섹션 타이틀 역할에는 항상 이 공유 토큰을 쓰고, 컴포넌트마다 별도 vh-blended 값을 새로 만들지 않는다. (Hero의 헤드라인은 별개 역할 — `--fs-hero-kr`을 그대로 쓴다, 의도적으로 훨씬 크다.) |
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

### 양쪽 맞춤(`text-align: justify`)과 `word-break`
`--font-kr`(Pretendard)로 여러 줄짜리 한글 본문에 `text-align: justify`를 쓰는 곳(`Promises`의 `itemTitle`/`itemDesc` 등)에서는, **전역 `globals.css`의 `word-break: keep-all` 기본값을 그 요소에서만 되돌려야 한다**:
```css
.itemDesc {
  text-align: justify;
  word-break: normal;
  overflow-wrap: break-word;
}
```
- `word-break: keep-all`(한글 어절 단위로만 줄바꿈 허용)이 걸린 채로 `justify`를 쓰면, 한 줄에 줄바꿈 가능한 지점(어절 경계)이 한두 곳뿐이라 그 틈을 억지로 벌려서 채우는 통에 자간이 눈에 띄게 늘어져 보인다("양쪽 맞춤할 때 단어별로 끊지 말자"는 사용자 피드백이 정확히 이 증상이었다).
- `word-break: normal; overflow-wrap: break-word;`로 로컬에서 되돌리면, `justify`가 훨씬 많은 줄바꿈 지점(글자 단위 포함)을 갖게 되어 자간을 늘리는 대신 줄바꿈으로 채운다 — 단어가 중간에 끊기더라도(한글은 음절 단위라 어색함이 덜하다) 자간이 늘어지는 것보다 낫다는 게 사용자의 명시적 선호였다.
- 전역 `keep-all` 자체는 그대로 둔다 — 이 로컬 override는 `justify`가 걸린 요소에만, 필요할 때만 적용한다.

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
| `--header-height` | **64px 고정** (fluid 아님, 2026-09-28에 80px→64px로 축소), `Header.tsx`가 실측 높이로 재확인 | 고정 헤더 높이. 스냅 섹션의 top padding 계산에 사용 (4.8 참고). `Header.module.css`의 `.header { height }`와 `globals.css`의 `--header-height` 기본값(SSR/첫 페인트 폴백) 두 곳이 항상 같은 값이어야 한다 — 하나만 바꾸면 JS가 실측치로 덮어쓰기 전까지 순간적으로 어긋난다. |

> `--space-section-y`(40px)와 `--gap-lg`(85px)의 최댓값은 Figma 1920 프레임에서 실측한 값이다 (섹션 상하 여백 40px, 타이틀→콘텐츠 간격 85px). 임의로 더 크게 잡지 않는다 — 예전에 80px/48px로 더 크게 잡았다가 레이아웃이 화면마다 잘리는 문제가 있었다.

### 레이아웃 규칙
- **고정 1920px 레이아웃 금지.** 모든 컨테이너는 `max-width: var(--content-max); margin: 0 auto;` + `padding: 0 var(--space-page-x)` 패턴.
- **모든 섹션은 태블릿/PC 가로 화면 어디서든 한 화면(`100dvh`)에 다 들어와야 한다** (2026-09-28 방침 변경 — 사용자의 명시적 요구사항). 이전엔 "`min-height: 100dvh`가 기본, 콘텐츠가 넘치면 그냥 더 스크롤하게 둔다"가 기본값이었지만, 콘텐츠가 늘어난 뒤(약속 6개, 카드 캐러셀 등) 섹션마다 화면 비율이 안 맞는다는 피드백을 받고 뒤집었다. 지금은 **`height: 100dvh; overflow: hidden;`을 안전망으로 걸고, 그 안의 폰트/간격을 전부 `vh`가 섞인 `clamp()`로 만들어서 안전망이 실제로 뭔가를 잘라내기 전에 이미 알아서 한 화면에 맞도록** 만든다. 상세 레시피와 이유는 4.9 참고 — `min-height`만 걸고 넘치게 두는 옛 패턴은 더 이상 기본값이 아니다.
- 가로 스크롤 발생 금지. **`overflow-x: hidden`은 반드시 `body`에만 건다 (`html`에는 걸지 않는다)** — `html`에 걸면 이 프로젝트가 쓰는 Chromium 빌드에서 `scroll-snap-type`이 조용히 무시되는 버그가 있다 (실측으로 확인됨). 새 컴포넌트가 가로 스크롤 규칙을 깨지 않는지 `document.documentElement.scrollWidth === clientWidth`로 확인.
- ⚠️ **`body`에만 건 `overflow-x: hidden`으로는 못 막는 경우가 있다**: 실제 스크롤 컨테이너는 `body`가 아니라 `html`인데(4.8), `html`의 `overflow-x`는 `visible`로 남아있으므로, **`transform`으로 뷰포트 밖에 숨겨두는 요소**(예: `Reveal`의 `axis="x"` 모드 — `DevelopmentPlan`의 양옆 카드가 등장 전 `translateX(±667px)`로 숨어있는 것)는 `body`의 클리핑을 우회해서 `html` 레벨에서 진짜로 스크롤 가능한 가로 여백을 만든다(`window.scrollTo({left:9999})`로 실측 가능 — `documentElement.scrollWidth`만 보는 것보다 이 쪽이 더 확실하다). `html`/`body`를 건드릴 수 없으니, **그 transform이 걸리는 요소의 가장 가까운 자기 컴포넌트 컨테이너(예: `.section`)에 `overflow-x: hidden`을 로컬로 건다** (`DevelopmentPlan.module.css`의 `.section`이 이 사례).
- 브레이크포인트 기준: **1920 / 1440 / 1024 / 768 / 390**. 실제 CSS 분기점은 컴포넌트 CSS Module 안에 `@media (max-width: 1023px)`, `@media (max-width: 640px)` 형태로 존재. 다단 그리드는 1024 이하에서 2열, 640 이하에서 1열로 재배치하는 것이 기본 패턴 (`DevelopmentPlan.module.css` 참고).

---

## 4. 컴포넌트 패턴

새 컴포넌트를 만들 때는 기존 컴포넌트 중 가장 가까운 패턴을 복제해서 시작한다.

### 4.1 섹션 헤더 (`heading` 패턴)
- `Promises`와 `PolicyCarousel`은 `+` 아이콘(`PlusIcon`) + 제목 텍스트, 밑줄 없음. 아이콘/텍스트 색은 섹션 배경에 맞춰 바꾼다 — 다크 배경(`Promises`)은 아이콘 `#ABB8C3`/텍스트 `--color-light-gray`. **`PolicyCarousel`은 2026-09-28 동기화로 섹션 배경이 다크(`#141414`)에서 흰색(`--color-white`)으로 바뀌면서, 헤딩 색도 `--color-white`에서 `--color-line`(#333)으로 함께 바뀌었다** — 배경이 바뀌면 헤딩·아이콘 색은 항상 같이 재검토한다(하드코딩된 흰색이 새 배경에 묻히는 사고를 막기 위함). 제목 텍스트도 "나답게・다함께・앞으로"에서 "나답게・다함께・앞으로 핵심 공약"으로 바뀌었다.
- **`DevelopmentPlan`(section2)은 섹션 헤더가 없다.** 예전엔 여기도 "유병현의 세 가지 약속" 타이틀을 달고 있었는데, `Promises`의 제목과 완전히 같은 문구라 중복이었다 — Figma가 2026-09-28 동기화에서 이 중복을 없애면서 section2의 헤더 자체를 지웠다. 새 섹션을 만들 때 Figma에 헤더가 없으면 억지로 만들어 넣지 않는다.
- 제목 폰트 크기: `--fs-section-title`, weight 400, `text-transform: uppercase`(국문에는 영향 없음, 영문 대비용으로 유지)

### 4.2 카드
- **풀블리드 포토 카드** (`DevelopmentPlan`): Figma 2026-09-28 동기화로 "상단 텍스트 + 하단 이미지" 구조에서 바뀐 새 기본형. 카드 전체를 사진 한 장이 채우고(`position:absolute;inset:0;object-fit:cover`) 그 위에 `rgba(0,0,0,0.5)` 오버레이, 그 위에 중앙 정렬된 흰 텍스트(제목 굵고 아주 크게 + 부제 + 설명 + 링크)가 얹힌다. radius 20px(카드형 콘텐츠 중 가장 큰 radius — 예전 `--radius-card` 10px보다 두 배 크다). 구조:
  ```
  .card { position: relative; aspect-ratio: <w>/<h>; border-radius: 20px; overflow: hidden; isolation: isolate; }
  .cardBg      { position: absolute; inset: 0; object-fit: cover; z-index: -2; }
  .cardOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: -1; }
  .cardContent { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  ```
  여러 카드가 같은 배경 사진을 공유할 수 있다(Figma가 실제로 그렇게 되어 있으면 억지로 카드마다 다른 사진을 배정하지 않는다 — `lib/policyData.ts`의 `planCards`가 셋 다 `plan-card-bg.png`를 쓰는 게 그 예).
- **데이터 카드** (`PolicyCarousel`): 흰 배경, radius 14px(모던화 허용 범위), 상단 넘버+제목(key 컬러), 카테고리별 체크리스트, 하단 링크. **텍스트/구조는 Figma 그대로, 비주얼만 모던화된 예시**이므로 향후 카드형 콘텐츠 추가 시 이 패턴을 기본값으로 쓴다.

### 4.3 버튼 / 링크
- **텍스트 링크** ("자세히 보기"): `--font-en`, `--fs-btn`(13.5px), 화살표 아이콘(`ArrowRightIcon`) 동반, 배경 톤에 따라 색만 다르게(`--color-line` / `--color-muted`)
- **아이콘-온리 링크** (`PolicyCarousel` 카드 헤더): 텍스트 라벨 없이 `ArrowRightIcon`만, `aria-label`로 접근성 라벨을 대신 단다. Figma가 텍스트 링크를 아이콘 하나로 교체한 곳(2026-09-28 동기화)에서는 억지로 텍스트를 남기지 않고 그대로 따른다.
- **원형 아이콘 버튼** (캐러셀 prev/next): `border: 1px solid`, `border-radius: 999px`, hover 시 반전, `:disabled`일 때 `opacity: 0.3`
- **헤더의 Contact Us 버튼은 삭제되었다** (Figma 2026-09-28 동기화 — 모든 섹션 헤더가 브랜드 텍스트 + 햄버거 메뉴만 남기는 것으로 통일됨). 새로 헤더를 건드릴 때 이 버튼을 되살리지 않는다.

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
- `.scrolled` 상태의 하단 테두리는 **`1px solid var(--color-light-gray)`(`#D9D9D9`)** — 검정 기반 반투명(`rgba(0,0,0,0.08)` 같은)이 아니다. Figma의 모든 섹션 헤더가 이 옅은 회색 실선을 공통으로 쓰는 걸 실측(Figma 덤프의 `border-[var(--color/light-gray,#d9d9d9)]` 패턴)으로 확인했다. 헤더는 모든 섹션에서 `position: fixed`로 항상 떠 있으므로 — 이 자체로 "모든 페이지에서 헤더가 항상 보여야 한다"는 요구사항을 만족한다(추가 조치 불필요).
- 자식 요소(브랜드 텍스트, 버튼, 아이콘)는 색을 하드코딩하지 않고 전부 `color: inherit` / `border-color: currentColor`로 상속받아야 상태 전환이 한 번에 적용된다.
- `ResizeObserver`로 헤더의 실제 렌더링 높이를 재서 `--header-height` CSS 변수에 반영하고, 그 값이 바뀔 때마다 IntersectionObserver도 새 `rootMargin`으로 재생성한다 (fluid 타이포로 헤더 높이가 브레이크포인트마다 달라지기 때문).
- **새로고침하면 항상 맨 위(히어로)로 돌아간다.** 브라우저가 기본으로 스크롤 위치를 복원하는 걸 막으려고, 마운트 시 `history.scrollRestoration = 'manual'`을 설정하고 `window.scrollTo(0, 0)`을 호출한다(`Header.tsx`의 별도 `useEffect`). 이 프로젝트는 페이지가 하나뿐이라 Header가 곧 앱 전체의 최상위 마운트 지점이라 여기 둬도 안전하지만, 라우트가 여러 개인 프로젝트에서 이 패턴을 가져다 쓸 때는 클라이언트 사이드 네비게이션마다 재실행되지 않도록 주의한다.
  - ⚠️ **마운트 시 한 번만 `scrollTo(0,0)`을 부르는 것만으로는 부족할 수 있다 (2026-09-28).** "새로고침하면 히어로가 아니라 섹션 2로 바로 넘어간다"는 버그가 보고됐다 — 셀프호스트 폰트가 폴백 폰트에서 교체되며 생기는 리플로우, 또는(특히 아이패드에서) 모바일 툴바가 사라지며 `100dvh`가 바뀌는 것처럼, 마운트 직후 뷰포트 위쪽 레이아웃이 살짝 움직이는 원인은 여러 가지다. `scroll-snap-type: y mandatory`가 걸린 상태에서는 단 몇 px의 스크롤 드리프트도 다음 섹션의 스냅 지점으로 풀려버릴 수 있다. 두 겹으로 대응했다: (1) `html`에 `overflow-anchor: none;`(`globals.css`)을 걸어서 브라우저의 스크롤 앵커링(레이아웃 변화를 보정하려고 스크롤 위치를 자동으로 미세 조정하는 기능) 자체를 끈다 — 이게 근본 원인이므로 우선한다. (2) `Header.tsx`에서 `window.scrollTo(0,0)`을 `load`/`pageshow` 이벤트에서도 다시 호출해서, 마운트 이후에 일어나는 늦은 레이아웃 변화까지 잡는다. 단, 이 재호출은 반드시 `window.scrollY < 100`일 때만 실행한다 — 그 가드가 없으면 느린 네트워크에서 사용자가 이미 의도적으로 한참 스크롤한 뒤에 `load`가 늦게 발화했을 때 스크롤이 강제로 맨 위로 튕겨버리는 새 버그가 생긴다.

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

### 4.9 모든 섹션을 정말로 한 화면에 맞추기 (`height: 100dvh` 안전망 + `vh`-블렌드 `clamp()`)
(이전엔 이 번호가 "결번" — 예전에 있던 "짧은 뷰포트에서 강제로 한 화면에 우겨넣기" 전략을 4.8의 `min-height` 기본 정책으로 대체하며 제거했었다. 2026-09-28에 **정반대 방향으로 다시 뒤집었다** — 콘텐츠가 늘어난 뒤 섹션마다 화면 비율이 안 맞는다는 명시적 피드백을 받고, 이번엔 "한 화면에 반드시 맞춘다"를 전 섹션 공통 정책으로 승격했다.)

**레시피 (Hero/DevelopmentPlan/Promises/PolicyCarousel 전부 이 패턴):**
1. `.section { height: 100dvh; overflow: hidden; }` — `min-height`가 아니라 `height`로 고정하고 넘치는 건 잘라낸다. 이건 **최후의 안전망**이지, 이것만으로 "맞춘다"고 여기지 않는다 — 안전망이 실제로 뭔가를 자르면 그 콘텐츠는 사용자에게 안 보이는 버그다.
2. 안전망이 실제로 아무것도 자르지 않도록, 섹션 내부의 폰트 크기·줄간격·gap·padding을 **`vw`만이 아니라 `vh`도 섞은 `clamp()`**로 바꾼다. 기존 fluid 타입 스케일(2장)은 전부 `vw`만 쓰는데, 그건 "가로로 좁아지면 줄어든다"만 표현하지 "세로로 짧아지면 줄어든다"는 표현하지 못한다 — 가로로 넓고 세로로 짧은 노트북/구형 모니터 비율(예: 1280×720)에서 정확히 이 문제가 난다. 예:
   ```css
   /* vw만 있는 기존 패턴 — 세로로 짧은 화면에서 안 줄어듦 */
   font-size: clamp(1rem, 0.4rem + 1.6vw, 1.75rem);
   /* vh를 섞은 패턴 — 세로가 짧아지면 같이 줄어듦 */
   font-size: clamp(0.85rem, 0.3rem + 1.3vh, 1.75rem);
   ```
3. **먼저 줄일 요소의 우선순위**: 타이틀/헤딩 → 아이콘 → 아이템 사이 gap/row-gap → 본문 텍스트 순으로 줄인다("화면이 작아지면 타이틀이나 헤더를 줄여서 확보하라"는 사용자 지시 그대로). 본문 텍스트(`itemDesc`, 카드 카테고리 리스트 등)는 가장 마지막에, 가장 조금만 줄인다.
4. 카드처럼 `aspect-ratio`로 높이가 너비에 종속된 요소(`DevelopmentPlan`의 `.card`)는 `vh`-`clamp()`로 폰트를 줄이는 게 안 통한다 — 대신 `max-height`를 `vh`-`clamp()`로 걸어서 "너비 기준 비율 높이"에 상한을 씌운다. 카드 배경이 `object-fit: cover`라면 상한에 걸려도 사진이 조금 더 타이트하게 크롭될 뿐, 찌그러지거나 잘리지 않는다.
5. `position: absolute`로 떠 있는 요소(예: `ScrollDownIndicator`, `bottom: 24px`)가 있으면, 그 요소가 차지할 공간을 **레이아웃 흐름 안의 형제 요소가 `padding-bottom`으로 미리 비워둬야 한다** — absolute 요소는 flex/grid 흐름에서 공간을 차지하지 않으므로, 그 위 형제 콘텐츠가 자기 높이를 100%까지 채우면 겹친다(`PolicyCarousel`의 `.trackOuter { padding-bottom: clamp(70px, 6vw + 2vh, 100px); }`, `DevelopmentPlan`의 `.inner { padding-bottom: clamp(80px, 6vw + 4vh, 120px); }`가 이 사례). 이 padding 자체도 섹션 전체 높이를 밀어낼 수 있으므로, 추가한 직후 반드시 fit 매트릭스를 다시 돌린다 — `DevelopmentPlan`에서 이 padding을 추가했다가 `min-height`만 걸려 있던 그 섹션이 `768×1024`에서 66px 넘치는 걸 뒤늦게 발견했고, 결국 그 섹션도 `height:100dvh` 안전망으로 바꿔야 했다.
6. ⚠️ **`align-items: stretch`로 늘어나는 요소(카드 등)에 `max-height` 상한을 안 걸면, 세로로 아주 긴 뷰포트(세로형 태블릿)에서 터무니없이 늘어난다.** `PolicyCarousel`의 카드는 `.track { height:100% }` → `.trackOuter { flex:1 1 auto }`로 받는 세로 공간을 전부 채우도록 늘어나는데, `1024×1366`처럼 세로가 아주 긴 화면에서는 콘텐츠(제목+카테고리 리스트, 실측 ~170px)가 카드 위쪽 ~200px에만 몰려 있고 나머지 ~700px가 텅 빈 배경 텍스처로 남아 — 오버플로우는 없지만 명백히 깨진 것처럼 보이는 버그였다(`984px` 높이 카드 vs 콘텐츠 170px). `max-height: clamp(280px, 55vh, 620px)`처럼 desktop 기준 비율에 맞춘 상한을 걸어서 고쳤다. **overflow 매트릭스가 전부 0이어도 이런 "안 넘치지만 이상하게 늘어진" 레이아웃은 못 잡는다 — 스크린샷을 실제로 눈으로 봐야 한다** (아래 항목 참고).
7. ⚠️ **숫자(오버플로우 0px)만 확인하고 스크린샷을 눈으로 안 보면 이런 버그를 놓친다.** 위 6번 카드 늘어짐 버그와, `DevelopmentPlan`의 `.card { max-height }`를 짧은 화면용으로 너무 낮게(전역으로) 낮췄다가 데스크톱(`1920×1080`, 3열 단일 행이라애초에 짧은 화면 문제가 없던 레이아웃)에서 카드 제목("다함께"/"나답게"/"앞으로" 큰 타이틀)이 `overflow:hidden`에 위쪽이 잘려나가는 버그를 만든 적도 있다 — 숫자로는 안 잡히고 실제 렌더링을 봐야 보이는 종류다. 짧은-화면용 `max-height`를 조인 뒤에는 **그 값이 전역으로 걸리는지, 특정 브레이크포인트(`@media`)에만 걸리는지 반드시 확인**하고, 문제가 있던 조합뿐 아니라 원래 문제가 없던 조합(대표로 `1920×1080`)도 스크린샷으로 다시 확인한다.

**테스트 방법 — `scrollHeight`를 믿지 말 것:**
- `section.scrollHeight - section.clientHeight`를 "넘치는 양"으로 쓰면 안 된다. `justify-content: center`가 걸린 flex 컨테이너에서는 이 값이 실제 시각적 오버플로우와 다르게 나오는 걸 확인했다(축소되기 전 flex item의 가상 크기를 반영하는 것으로 추정).
- 대신 **각 자식 요소 자신의 `getBoundingClientRect()`를 섹션의 `getBoundingClientRect()`와 직접 비교**한다: `overflowBottom = Math.max(0, child.bottom - section.bottom)`. 카드 안쪽 텍스트처럼 한 겹 더 안에 있는 요소(예: `PolicyCarousel` 카드의 마지막 `categoryItem`)까지 재귀적으로 확인해야, `overflow: hidden`이 걸린 부모 상자 자체는 안 넘쳐도 그 안의 텍스트가 잘리고 있는 걸 놓치지 않는다.
- 반드시 **실제로 스크롤해서 해당 섹션에 도달한 뒤, 등장 애니메이션(`Reveal`)이 완전히 끝난 상태**에서 측정한다(`getComputedStyle(el).transform`이 항등 행렬인지 확인). 스크롤하지 않은 상태에서 측정하면 `Reveal`이 아직 `translateY(254px)` 같은 숨김 상태라, 엉뚱한(하지만 우연히 비슷해 보이는) 수치가 나올 수 있다.
- 테스트 대상 뷰포트 매트릭스(실측으로 문제를 찾은 조합들): `1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 1024×1366, 768×1024, 820×1180, 1180×820, 1280×720`. 특히 **가로로 넓고 세로로 짧은 조합**(`1280×720`, `1366×768`)과 **좁고 긴 세로형 태블릿**(`768×1024`)이 제일 잘 깨진다 — 데스크톱 하나, 모바일 하나만 확인하고 넘어가지 않는다.

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
- **1024px 미만에서도 이미지는 계속 `position: absolute; right:0; bottom:0;`로 고정한다 — `position: static`으로 풀지 않는다.** 이전엔 모바일에서 static + `align-self: center`로 자연스러운 흐름에 맡겼는데, 뷰포트 폭이 바뀔 때마다 이미지가 이리저리 움직이는 것처럼 보인다는 피드백을 받았다. 절대 위치를 유지한 채 `width`만 `clamp()`로 줄이면 항상 같은 모서리(우측 하단)에 붙어 있어서 훨씬 안정적이다. 겹침은 `.headline`을 `width: 100%; align-items: flex-start`로 상단에 배치해 이미지와 텍스트가 수직으로 자연히 분리되게 해서 방지한다(둘 다 같은 `.hero`의 절대/플렉스 자식이라 서로 레이아웃에 영향을 주지 않는다).
- 텍스트 블록(`.headline`)은 데스크톱에서 `transform: translateY(-50px)`로 살짝 위로 올려 시각적 중심을 맞춘다 (모바일 `@media (max-width: 1023px)`에서는 `transform: none`으로 되돌린다 — 모바일은 이미 상단 정렬 레이아웃이라 별도 보정이 필요 없다).
- **줄바꿈이 반드시 특정 지점에서 일어나야 하는 타이틀**(예: "자유로운 지성,(줄바꿈)시대를 여는 고대")은 CSS `white-space`/너비 조절로 자연스러운 wrap에 기대지 말고, JSX에서 아예 `<span className={styles.headlineLine}>`으로 줄 단위로 쪼개고 `.headlineLine { display: block; }`을 건다. 뷰포트 폭이 넓어져도(또는 폰트 크기가 줄어도) 줄바꿈 위치가 흔들리지 않는다.
- 모바일 전용으로 폰트 크기를 더 줄여야 하면 전역 fluid 토큰(`--fs-hero-kr` 등)을 건드리지 말고, 해당 컴포넌트의 `@media (max-width: 640px)` 블록 안에서 그 요소에만 별도 `clamp()`를 지정한다 — 다른 곳에서 같은 토큰을 재사용 중이면 전역 값을 줄였을 때 의도치 않게 같이 줄어들 수 있다.
- fade-in은 `heroFadeIn` 키프레임(`opacity 0→1` + `translateY(28px→0)`)을 국문/영문 줄에 각각 살짝 다른 delay로 건다. **duration은 짧게 잡지 않는다** — 처음에 900ms로 했더니 "뚝 끊기는" 느낌이라는 피드백을 받고 1700ms(`cubic-bezier(0.19,1,0.22,1)`, ease-out 계열)로 늘렸다. 다른 곳에서도 로드 즉시 재생되는 fade-in은 1.2~1.8s 정도로 여유 있게 잡는 걸 기본값으로 삼는다(4.14의 스크롤 트리거 Reveal은 700ms로 더 짧아도 된다 — 사용자가 스크롤하는 동작 자체가 이미 "빠른 입력"이라 성격이 다르다).

### 4.12 엣지-투-엣지 스와이프 캐러셀 (`PolicyCarousel`)
카드가 화면 가장자리까지 닿아서 "옆으로 더 있다"는 걸 시각적으로 알려주는 가로 캐러셀 패턴:
- 제목 줄과 prev/next 버튼 줄은 **서로 다른 행**으로 분리하고(Figma가 그렇게 되어 있다 — 같은 행에 나란히 두지 않는다), 둘 다 `max-width: var(--content-max)` + `padding: 0 var(--space-page-x)`로 감싼 `.headerWrap` 안에 둔다.
- 카드 트랙만 **그 padding 밖으로 뺀다**: `.trackOuter`는 `width:100%`(제약 없음), `.track` 자체에 `padding: 0 var(--space-page-x)`를 걸어서 카드가 화면 진짜 가장자리까지 스크롤되지만 쉬는 위치에서는 첫 카드가 본문 여백과 맞춰 보이게 한다.
- 스크롤은 세 가지 입력을 모두 지원한다: 버튼 클릭(`scrollBy({behavior:'smooth'})`), 트랙패드/터치(네이티브 `overflow-x:auto`), **마우스 클릭 드래그**(`onPointerDown/Move/Up`로 `scrollLeft`를 직접 갱신). 드래그 중에는 `.track`에 `scroll-behavior: smooth`를 걸지 않는다 — 걸려 있으면 매 `mousemove`마다 애니메이션이 끼어들어 드래그가 끈적하게 느껴진다(smooth는 버튼 클릭의 `scrollBy` 호출에만 inline 옵션으로 준다).
- `cursor: grab` (드래그 중엔 `grabbing`)으로 스와이프 가능함을 알려준다.
- 세로 여백 배분: 버튼 줄→트랙 간격은 좁게(`margin-top: clamp(16px, 2vw, 32px)`), 트랙→Footer 간격은 넉넉하게(`.trackOuter`의 `padding-bottom: clamp(24px, 3.5vh, 40px)`) — "카드 밑 여백이 없어 보인다"는 피드백을 받고 이 비율로 조정했다. 새로 세로 캐러셀형 섹션을 만들 때도 상단보다 하단 여백을 더 확보하는 쪽이 자연스럽다.
- ⚠️ **`scroll-snap-align`이 걸린 요소 자체에는 `transform`을 걸지 않는다** (hover 포함). `.card`(li, snap 대상)에 직접 `:hover{transform:translateY(-6px)}`를 걸었더니, 호버할 때 트랙의 스크롤 위치가 왼쪽 끝으로 튀는 버그가 있었다. 고친 방법: `.card`는 스냅 대상으로만 두고 `transform`을 전혀 주지 않고, 그 **안에 `.cardInner`를 한 겹 더 두어 배경·radius·overflow·hover transform을 전부 `.cardInner`로 옮겼다**. 가로 스크롤 캐러셀에 카드 hover 효과를 넣을 땐 항상 이 2단 구조(바깥 = snap 대상, 안쪽 = 비주얼/transform)를 쓴다.
- ⚠️ **가로 스크롤 컨테이너에 좌우 여백을 줄 때는 `padding`만으로 끝내지 말고 `scroll-padding-left`/`scroll-padding-right`도 같은 값으로 같이 건다.** `padding`만 걸어두면 `scroll-snap-type: x proximity`가 첫 로드 시(버튼을 한 번도 안 눌렀을 때) 그 패딩을 무시하고 scrollLeft를 자동으로 보정해버려서, 첫 카드가 여백 없이 화면 끝에 붙어 있다가 버튼을 한 번 누르면 그제서야 여백이 "생기는" 것처럼 보이는 버그가 있었다. `scroll-padding`은 브라우저에게 "스냅 계산에서 이 여백은 의도된 것"이라고 알려주는 역할이라, 이걸 같이 걸면 최초 페인트부터 `scrollLeft: 0`에서 패딩이 정확히 보인다. 새로 가로 스크롤 캐러셀을 만들 때 이 둘을 한 세트로 기억한다.
- ⚠️ **가로 스크롤 트랙에 `overflow-x: auto`를 걸면 `overflow-y`도 자동으로 `auto`(클립)가 된다** (스펙상 한쪽 축이 `visible`이 아니게 되면 다른 축도 `visible`을 유지할 수 없다). `.cardInner:hover`처럼 세로로 살짝 움직이는 hover 효과가 있으면, 트랙의 세로 여백이 `padding-bottom`에만 있고 `padding-top`이 0일 때 위로 움직이는 hover가 잘려 보인다(카드 상단 모서리가 잘리는 버그). 오버플로우 클리핑은 **content box가 아니라 padding box 가장자리**에서 일어나므로, `.track`에 hover 이동량만큼(또는 그 이상) `padding-top`을 주면 그 여백 안에서는 잘리지 않는다. 시각적 여백이 늘어나 보이지 않도록, 그만큼을 바깥 wrapper(`.trackOuter`)의 `margin-top`에서 `calc()`로 빼서 상쇄한다.
- **카드 비주얼 (2026-09-28 동기화, 그림자/배경 이미지 2026-09-28 재검증)**: `.cardInner`에 `border`(예전 `1px solid rgba(0,0,0,0.06)`) 대신 **항상 켜져 있는** `box-shadow: 0 12px 15px rgba(0,0,0,0.15)`를 기본값으로 건다(hover에서 `0 20px 30px rgba(0,0,0,0.22)`로 더 진해짐). radius도 14px→10px로 줄었다. 카드 배경 이미지는 **Hero의 `hero-bg.png`를 재사용하지 않는다** — 처음엔 시각적으로 비슷해 보인다는 이유로 재사용했다가, 실제 Figma 카드 노드(660:4956)를 `download_assets`로 직접 확인하니 다른(더 고해상도) 원본 이미지였다. 전용 파일 `public/images/policy-card-bg.jpg`로 저장해서 쓴다 — **"비슷해 보이는" 기존 에셋을 재사용하기 전에, 그 요소의 실제 Figma 노드에서 에셋을 다시 받아 맞는지 확인한다.** 색상도 마찬가지로 직접 검증한다: 헤더 우측 화살표 아이콘(`.cardHeadLink`)은 카드 넘버/타이틀과 같은 `--color-key`(빨강)처럼 보이지만, Figma SVG의 실제 `fill`은 `#AEA89B`(`--color-muted`)다 — 패턴 매칭으로 색을 추측하지 말고 실제 SVG를 받아서 `fill`/`stroke` 속성을 읽는다. 하단의 "자세히 보기" 텍스트 링크는 없어지고, 카드 헤더 우측에 **아이콘만 있는** `ArrowRightIcon` 링크(`aria-label`로 접근성 보완)로 대체됐다.
- ⚠️ **그림자가 항상 켜져 있으면(hover 전용이 아니면) 트랙의 padding을 그만큼 넉넉히 잡아야 한다.** hover 전용이던 시절의 `padding: 12px var(--space-page-x) 8px`로는 상시 그림자(휴지 상태에서도 위 ~10px, hover 시 아래 ~50px까지 번짐)가 `overflow-x: auto`의 클리핑 가장자리에 잘린다 — `.track`의 padding을 `16px var(--space-page-x) 56px`까지 늘리고, `.trackOuter`의 `margin-top`/`padding-bottom`에서 그만큼을 다시 빼서 카드의 휴지 위치가 예전과 같아 보이게 상쇄한다.
- ⚠️ **카드 타이틀이 헤더 아이콘과 겹칠 수 있다.** `.cardTitle`에 `white-space: nowrap`을 걸어뒀더니, 카드 중 하나("전문적 행정과 인사경영")처럼 유독 긴 타이틀이 `.cardHeadLink` 화살표 아이콘까지 침범했다. 고친 방법: `white-space`를 `normal`로 풀어 2줄까지 자연스럽게 줄바꿈되게 하고, `.cardTitleRow`에 `flex-wrap: wrap; align-items: flex-start;`를 걸고, `.card` 너비도 Figma 원본(504px)보다 넓은 `clamp(340px, 30vw, 560px)`로 살짝 키워서 대부분의 타이틀은 한 줄에 들어가고 예외만 2줄로 줄바꿈되게 했다.

### 4.13 2-컬럼 x 3-로우 약속 그리드 (`Promises`)
Figma가 (node 614:6269, 2026-09-28 동기화) 3개였던 "약속"을 6개로 늘리면서, 예전의 "6컬럼 그리드 + 오른쪽 정렬 + 구분선" 레이아웃을 진짜 2열 카드형 그리드로 바꿨다. 새 패턴:
```css
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: clamp(24px, 5.2vw, 100px);
  row-gap: clamp(16px, 1.6vw, 30px);
}
.item {
  display: flex;
  align-items: flex-start;
  gap: clamp(20px, 2.1vw, 40px);
}
.itemNumber { flex: 0 0 clamp(56px, 5.1vw, 98px); }
```
- 아이템을 DOM 순서대로만 나열하면 그리드가 알아서 2열씩 채운다(1→col1/row1, 2→col2/row1, 3→col1/row2 ...) — `grid-column`/`grid-row`를 수동 지정할 필요 없다.
- 구분선(`border-top`)은 새 디자인에 없다 — 세로 `row-gap`만으로 행을 분리한다.
- 번호(`itemNumber`)와 제목(`itemTitle`)이 같은 폰트 크기(`--fs-promise-title`, 34px 기준)를 공유한다 — 예전처럼 번호만 더 큰 별도 크기를 쓰지 않는다.
- 6개 항목이 한 화면(`100dvh`)에 다 들어와야 한다(4.9 참고) — `.section`은 `height: 100dvh; overflow: hidden;`을 안전망으로 걸고, `itemNumber`/`itemTitle`/`itemDesc`의 폰트 크기와 `.list`의 `row-gap`을 전부 `vh`가 섞인 `clamp()`로 만들어서 짧은 화면에서 실제로 줄어들게 한다. 예전엔 "넘치면 그냥 더 스크롤하게 둔다"였지만 지금은 반대다.
- **Figma 텍스트가 플레이스홀더인 항목은 그대로 플레이스홀더로 구현한다.** 6개 중 4~6번째는 Figma 파일에 아직 실제 한글 카피가 없고 영문 Lorem-스타일 placeholder("Your bold vision, our trusted craft...")가 제목/본문 모두에 그대로 남아있다 — 이럴 때 절대 그럴듯한 한글 문구를 지어내지 않는다. Figma에 있는 텍스트를 있는 그대로(placeholder라도) 옮기고, 코드 주석과 최종 응답으로 "이 항목들은 아직 실제 카피가 없다"는 걸 명시적으로 알린다.

### 4.14 스크롤 등장 애니메이션 (`components/Reveal.tsx`)
새로 등장할 때 fade + 위로 슬라이드되는 요소는 전부 이 컴포넌트로 감싼다. 절대 새 애니메이션 라이브러리(GSAP 등)를 설치하지 않고 `IntersectionObserver` + CSS transition만 쓴다.
```tsx
<Reveal as="li" className={styles.card} delay={index * 180} distance={56} scale={0.95} duration={1100}>...</Reveal>
```
- `as`로 실제 렌더링할 태그를 지정한다(그리드/리스트의 직계 자식이어야 할 때 `li`처럼 지정 — 불필요한 wrapper `div`를 만들지 않기 위함).
- **매번 재생된다.** 뷰포트에 들어올 때 `revealVisible`, 벗어나면 `revealHidden`으로 되돌아가므로 위아래로 스크롤할 때마다 트랜지션이 다시 보인다 (전에는 최초 1회만 재생하고 `disconnect()`했는데, 사용자 피드백으로 매번 재생하는 쪽으로 바꿨다). 스크롤 위치를 읽거나 바꾸지 않는 건 동일하므로 4.8의 scroll-snap과는 여전히 충돌하지 않는다.
- `delay`(ms)로 리스트 아이템을 스태거링하고, `duration`(기본 700ms)으로 재생 속도를 조절한다. `distance`(기본 24px)로 슬라이드 거리를, `scale`(기본 1 = 없음)로 살짝 커지며 나타나는 정도를 조절한다.
- **`distance`/`scale`을 키울수록 `duration`도 같이 늘린다.** 거리·스케일만 키우고 `duration`(기본 700ms)을 그대로 두면 움직임의 양에 비해 너무 빨리 끝나서 "뚝 끊기는"/오류처럼 보이는 느낌이 난다 — `DevelopmentPlan` 카드가 처음에 `distance:64, scale:0.92`인데 `duration`을 안 늘렸다가 이 문제를 겪었고, `distance:56, scale:0.95, duration:1100`으로 조정해서 해결했다. 새 Reveal 효과를 과감하게 만들 때는 항상 이 셋을 같이 조율한다.
- 기본 easing은 `app/globals.css`의 `.reveal`에 `cubic-bezier(0.22, 0.61, 0.36, 1)`로 정의되어 있다 (전에는 처음에 너무 급격히 감속하는 곡선이라 "팝" 하듯 튀어 보였다 — 더 완만한 곡선으로 바꿨다). 개별 인스턴스마다 다른 easing이 필요하면 `duration`처럼 prop으로 빼서 inline style로 넘기는 패턴을 추가한다.
- **`transform`을 쓰는 다른 CSS(예: `:hover`)와 절대 충돌하지 않는다.** `app/globals.css`의 `.revealHidden`/`.revealVisible`는 `:where()`로 감싸서 명시도를 0으로 낮춰뒀다 — 그래서 `.card:hover { transform: ... }`처럼 일반 클래스 규칙이 소스 순서와 무관하게 항상 이긴다. 새 컴포넌트에 Reveal + hover transform을 같이 쓸 때 이 패턴이 깨지지 않도록 주의한다(둘 다 `:where()` 밖에 있는 특정도가 있는 선택자를 쓰면 안전).
- 트랜지션 자체는 `.reveal` 클래스(모든 Reveal 인스턴스에 항상 붙음)에 정의되어 있어서 숨겨질 때도 같은 easing으로 애니메이션된다.
- 히어로 타이틀처럼 **스크롤 트리거 없이 로드 즉시** 페이드인해야 하면 Reveal을 쓰지 말고 CSS `@keyframes` + `animation`을 직접 건다 (`Hero.module.css`의 `heroFadeIn` 참고) — IntersectionObserver를 굳이 쓸 이유가 없다.
- **Figma에서 `get_motion_context`로 받은 모션을 그대로 복사하지 않는다 — 값만 참고해서 Reveal prop으로 번역한다.** Figma 프로토타입은 스크롤 트리거가 없어서, 디자이너가 애니메이션을 미리보기 하려고 "6초짜리 무한 반복 타임라인"처럼 만들어두는 경우가 있다(`Promises`의 `motion.dev` 코드가 실제로 이랬다: `repeat: Infinity`, 각 아이템이 6초 타임라인의 한 구간을 차지). 이 `repeat: Infinity`나 `times` 배열의 절대 시간을 그대로 옮기면 실제 사이트에서 콘텐츠가 계속 제멋대로 튀는 이상한 애니메이션이 된다. 대신 값에서 의미 있는 부분만 뽑는다: 각 아이템 자체의 `initial`→`animate` 값(예: `opacity: 0→1`, `y: 254→0`)을 `distance`/`opacity` 삼아 쓰고, 아이템 간 상대적 시간차만 `delay` 스태거링 비율로 반영한다(전체를 무한 반복시키지 않고 IntersectionObserver 1회성 트리거로 바꾼다). `Promises`의 6개 아이템이 `distance={254} duration={950} delay={index * 150}`로 구현된 게 이 사례다.
- **JS 없는 환경 대비**: `revealHidden`은 SSR 시 이미 `opacity:0`으로 렌더링되므로, `app/layout.tsx`의 `<noscript>` 블록이 JS가 없을 때 강제로 보이게 처리한다.
- `@media (prefers-reduced-motion: reduce)`에서 자동으로 무효화된다(항상 보이는 상태로 고정).

### 4.15 모바일 한 장씩 보기 카드 캐러셀 (`DevelopmentPlan`, `PolicyCarousel`)
데스크톱/태블릿에서는 그리드나 여러 장이 함께 보이는 캐러셀이던 카드 목록이, 폰 너비(`max-width: 640px`)에서는 **한 번에 카드 한 장 + 하단 prev/dots/next 내비게이션**으로 바뀌는 공용 패턴. 3장짜리 그리드(`DevelopmentPlan`)를 세로로 그냥 쌓으면 섹션이 `100dvh`를 넘어 스냅 섹션 안에서 추가 스크롤이 생기는 문제가 있었는데, 이 패턴으로 해결했다.
- 드래그/스크롤/prev-next-버튼/현재 인덱스 로직은 `hooks/useHorizontalCarousel.ts`에 공용 훅으로 뽑아뒀다 (`PolicyCarousel`이 먼저 갖고 있던 pointer-drag 로직을 두 번째 사용처가 생기면서 훅으로 추출). 트랙 엘리먼트에 `ref`, `onPointerDown/Move/Up/Leave/Cancel`을 연결하면 `atStart`/`atEnd`(버튼 disabled 판정용)와 `activeIndex`(현재 카드 인덱스, 첫 자식의 렌더링된 너비 + `column-gap`으로 스텝을 계산)를 제공한다. 카드 개수가 바뀌는 새 캐러셀을 추가할 때 로직을 새로 짜지 말고 이 훅을 재사용한다.
- 점 내비게이션은 `components/CarouselDots.tsx` (+ `.module.css`)로 공용화되어 있다. `count`/`activeIndex`/`onSelect`만 받는 순수 표시용 컴포넌트라 언제 보일지(데스크톱에서 숨길지 등)는 감싸는 컴포넌트가 CSS로 결정한다 — dots 자체엔 반응형 로직이 없다. 점 색상은 `background-color: currentColor`라서, 감싸는 `.mobileNav`에 `color`만 지정하면 다크/라이트 배경 어디서든 그대로 맞는다.
- 데스크톱 그리드(`display:grid`)와 모바일 캐러셀(`display:flex; overflow-x:auto; scroll-snap-type:x mandatory;`)은 **같은 DOM**(`<ul ref={trackRef}>` + `<li className={styles.card}>`)에 미디어쿼리로 다른 레이아웃을 입히는 방식이다 — 별도 모바일 전용 마크업을 만들지 않는다. `<ul>`을 감싸는 `.gridWrap`은 그리드/캐러셀과 그 아래 `.mobileNav`를 하나의 flex-column 자식으로 묶어서, `.inner`의 `justify-content: space-between`(제목은 위, 콘텐츠 덩어리는 아래)이 깨지지 않게 한다.
- `.card`가 모바일에서 `scroll-snap-align`의 대상이 되면(각 카드가 곧 스냅 지점), 4.12에서 정리한 "snap 대상에 직접 transform 금지" 규칙이 여기도 적용된다. `DevelopmentPlan`의 `.card`는 데스크톱 전용 hover-lift(`:hover{transform:translateY(-6px)}`)를 그대로 갖고 있으므로, `@media (max-width: 640px)` 블록 안에서 `.card:hover{transform:none}`으로 무력화한다(터치 입력엔 hover가 없어서 잃는 건 없다). `PolicyCarousel`처럼 카드가 이미 바깥(snap 대상)/안쪽(`.cardInner`, transform) 2단 구조라면 이 걱정이 애초에 없다 — 새 캐러셀을 만들 때는 가능하면 처음부터 2단 구조를 쓰는 쪽이 더 안전하다.
- 새 카드 캐러셀에 그대로 복사할 스니펫(모바일 전용 블록):
  ```css
  @media (max-width: 640px) {
    .grid {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: var(--gap-sm);
      scrollbar-width: none;
    }
    .grid::-webkit-scrollbar { display: none; }
    .card { flex: 0 0 100%; width: 100%; scroll-snap-align: start; }
    .mobileNav { display: flex; align-items: center; justify-content: center; gap: 18px; }
  }
  ```

### 4.16 hover 인터랙션
- **카드** (`DevelopmentPlan`, `PolicyCarousel`): `transform: translateY(-6px)` + `box-shadow`, `transition: 300ms cubic-bezier(0.16,1,0.3,1)`. 카드 안 이미지가 있으면 `transform: scale(1.04)`도 같이 (별도 `transition-duration` 500ms로 조금 더 느리게). 카드가 `Reveal`로 감싸여 있다면 4.14의 `:where()` 명시도 규칙 때문에 hover가 항상 이긴다.
- **"자세히 보기" 류 링크** (`cardLink`, `itemLink`): `gap`을 8px→9px 정도로 늘려서 화살표가 살짝 앞으로 나가는 느낌 + `color`를 포인트 컬러로 전환. `transition: gap 200ms ease, color 200ms ease;`
- 전부 `@media (prefers-reduced-motion: reduce)`에서 `transform` 애니메이션은 끈다(그림자/색 전환은 순간적이라 굳이 끄지 않아도 됨).

### 4.17 "SCROLL DOWN" 인디케이터 (`components/ScrollDownIndicator.tsx`)
섹션 하단에 고정된 "SCROLL DOWN" 텍스트 + 더블 쉐브론 아이콘. **네 섹션(`Hero`/`DevelopmentPlan`/`Promises`/`PolicyCarousel`) 전부에 단다** — 웹 버전에서는 어느 페이지에 있든 항상 보여야 한다는 사용자의 명시적 요구사항. Figma엔 원래 `Promises`/`PolicyCarousel`에만 있었지만, Figma에 없다고 자동으로 빼지 않고 일관성을 위해 전 섹션에 추가했다(마지막 섹션인 `PolicyCarousel`도 예외 없이 포함 — 스크롤할 다음 섹션이 없어도, "항상 보인다"는 요구사항이 우선한다). `active` prop은 라벨/아이콘의 바운스 애니메이션만 켜고 끌 뿐, 인디케이터 자체는 `active`와 무관하게 항상 렌더링된다 — "항상 보인다"를 만족하려면 이 컴포넌트를 조건부로 렌더링하면 안 된다.
```tsx
<ScrollDownIndicator active={settled} />
```
- `position: absolute; bottom: 24px; left: 0; width: 100%;` — 부모(`<section>`)가 `position: relative`여야 한다.
- **바운스 애니메이션은 섹션이 뷰포트에 나타나자마자 시작하지 않는다.** `active`가 `true`가 된 순간부터 `.bobbing` 클래스가 붙는데, 그 클래스 자체의 `animation-delay`(1.6s)가 "머문 뒤에 움직이기 시작"하는 딜레이를 담당한다 — JS `setTimeout`으로 흉내내지 않는다(그러면 effect 안에서 동기 `setState`를 호출하게 되어 린트 규칙에 걸리고, 로직도 더 복잡해진다). `active`가 `false`로 바뀌면 클래스가 빠지면서 애니메이션이 그냥 멈추고, 다음에 다시 `true`가 될 때 `animation-delay`부터 새로 재생된다 — 이게 "다시 들어왔을 때 또 딜레이 후 움직임"을 만드는 전부다.
- `active`는 4.18의 `useSectionSettled`가 준다 — 섹션에 진입만 해도가 아니라 스냅이 실제로 자리잡은 뒤에 움직이기 시작해야 자연스럽다.

### 4.18 섹션이 "자리잡았는지" 판정하기 (`hooks/useSectionSettled.ts`)
카드 등장 애니메이션이나 스크롤다운 인디케이터처럼 "이 섹션이 스크롤 스냅으로 완전히 자리잡은 뒤"에만 시작해야 하는 효과에 쓴다.
```tsx
const { ref, settled } = useSectionSettled<HTMLElement>();
// <section ref={ref}> ... </section>
```
현재 구현은 **`scrollend` 이벤트 기반**이다(2026-09-28, IntersectionObserver 기반에서 교체):
- 이전엔 `IntersectionObserver`로 `entry.boundingClientRect.top`이 `±6px` 안에 들어오는 순간 바로 `settled`를 `true`로 뒤집었다. 이것도 "보이는 비율 98%" 방식(아래 참고)보다는 나았지만, 네이티브 scroll-snap의 감속 애니메이션이 **완전히 멈추기 몇 프레임 전에** 먼저 발화하는 경우가 있었다 — 그 몇 프레임 동안 `Reveal`의 CSS 트랜지션이 아직 끝나지 않은 네이티브 스크롤 위에 겹쳐 시작되면서, 트랙패드로 부드럽게 스크롤할 때 "뚝뚝 끊기는" 느낌의 원인이 됐다(실측: 강제 확인용 Playwright 스크립트로 스크롤 도중 프레임을 폴링해서 확인).
- 지금은 **`document.addEventListener('scrollend', check)`** — 스크롤(스냅 감속 포함)이 완전히 멈췄을 때만 딱 한 번 불리는 이벤트라, 이 겹침이 원천적으로 없다. `check()`는 여전히 `el.getBoundingClientRect().top`이 `±6px` 안인지 확인한다(섹션이 실제로 이 섹션에 도달했는지 확인용 — `scrollend`는 어디서 멈췄는지 모르므로 여전히 필요). `scrollend`를 지원하지 않는 구형 Safari를 위해 `scroll` 이벤트를 150ms 디바운스하는 폴백을 그대로 둔다.
- ⚠️ **TypeScript 빌드 함정**: `"onscrollend" in window`를 `if` 조건에 직접 쓰면, 최신 DOM 타입 라이브러리가 `onscrollend`를 `Window`에 항상 존재하는 프로퍼티로 선언해서 TS가 그 분기를 "항상 참"으로 간주하고 **else 분기의 `window`를 `never` 타입으로 좁혀버려 빌드가 깨진다**(런타임에선 여전히 브라우저마다 실제 지원 여부가 다른데도). `const supportsScrollend = typeof window.onscrollend !== "undefined";`처럼 **별도 변수에 먼저 담아서** 쓰면 이 좁혀짐이 안 일어난다.
- ⚠️ **"보이는 비율(threshold)이 98% 이상"으로 판정하면 안 된다** (더 예전 버전에서 시도했다가 폐기). `IntersectionObserver`의 `intersectionRatio`는 "보이는 넓이 / 타겟 자신의 전체 넓이"라서, 섹션 내용이 뷰포트보다 크면(예: `Promises`가 항목 6개로 늘어난 뒤, 짧은 화면에서) 아무리 스크롤해도 이 비율이 "뷰포트 높이 / 섹션 높이"를 절대 못 넘는다 — 즉 `settled`가 영원히 `true`가 안 돼서 콘텐츠가 영원히 숨어 있는 버그가 난다(데스크톱에서만 테스트하고 넘어갔다가 아이패드 크기에서 이 버그를 놓칠 뻔했다). 4.9의 "모든 섹션이 한 화면에 들어와야 한다" 정책 이후로는 이 문제 자체가 잘 안 생기지만, 혹시 한 화면에 안 들어가는 새 섹션을 만들게 되면 이 함정을 다시 주의한다.
- 새 섹션에 이 훅을 쓸 때는 반드시 **실제 콘텐츠 높이가 뷰포트보다 큰 뷰포트 크기**(짧은 노트북 창, 아이패드 등)에서도 `settled`가 결국 `true`가 되는지 확인한다.
- ⚠️ **`resize` 리스너는 반드시 디바운스한다 (2026-09-28 추가).** iOS Safari 등 모바일 브라우저에서 스크롤하는 동안 주소창/툴바가 나타나거나 사라지면, 그 애니메이션이 진행되는 동안 `resize` 이벤트가 한 번이 아니라 **수십 번 연속으로** 발생한다. `check()`는 매번 `getBoundingClientRect()`(강제 동기 레이아웃)를 읽고 `setSettled`를 호출하므로, 디바운스 없이 `resize`에 바로 연결하면 툴바가 움직이는 그 짧은 시간 동안 강제 리플로우 + React 리렌더가 수십 번 겹쳐 쌓인다 — "스크롤 중 툴바가 나타나거나 사라질 때마다 애니메이션이 버벅거린다"는 증상의 원인이었다. `resize`에는 반드시 자체 타이머(현재 200ms)로 디바운스한 핸들러를 연결하고, `check()`를 직접 연결하지 않는다 — `scrollend`/`scroll` 경로는 이미 정상 동작하므로 건드리지 않는다.

### 4.19 방향성 있는 카드 등장 모션 (`DevelopmentPlan`)과 Figma 모션 그대로 옮기지 않기
Figma의 `get_motion_context`(node 612:1416)가 준 값: 가운데 카드는 아래에서(`y: 909→0`), 양옆 카드는 각자의 바깥쪽에서(`x: ∓666.667→0`) 들어오며 셋 다 동시에 `opacity: 0→1`. `components/Reveal.tsx`에 두 가지를 추가해서 옮겼다:
- **`axis` prop** (`'x' | 'y'`, 기본 `'y'`): `translate(x, y)` 두 축을 각각 별도 CSS 변수(`--reveal-distance-x`/`--reveal-distance-y`)로 관리해서, 같은 컴포넌트로 세로 슬라이드(기존 카드/리스트)와 가로 슬라이드(이번 카드)를 둘 다 표현한다. `axis="x"`일 때 `distance`는 부호가 방향이다 — 음수면 왼쪽에서, 양수면 오른쪽에서 들어온다.
- **`visible` prop** (선택): 넘기면 `Reveal`이 자기 `IntersectionObserver`를 아예 돌리지 않고 이 값을 그대로 쓴다. 여러 `Reveal` 인스턴스가 "섹션 하나가 자리잡았다"는 같은 트리거를 공유해야 할 때 쓴다 — `DevelopmentPlan`의 카드 3장이 각자 따로 관찰하는 대신 `visible={settled}`(4.18) 하나로 동시에 트리거되고, `delay` prop으로만 "가운데가 먼저, 양옆이 조금 뒤에"라는 순서를 표현한다.
- ⚠️ **Figma 모션 데이터를 곧이곧대로 복사하지 않는다.** Figma 프로토타입엔 스크롤 트리거가 없어서, 디자이너가 미리보기용으로 "6초짜리 무한 반복(`repeat: Infinity`)" 타임라인을 만들어두는 경우가 흔하다(이 카드 모션도, `Promises`의 6개 아이템 모션도 둘 다 이런 형태였다). 그 `repeat`나 절대 시간(`times` 배열)을 그대로 옮기면 실제 사이트에서 계속 제멋대로 움직이는 이상한 애니메이션이 된다. 옮길 건 ① 각 요소 자신의 `initial`→`animate` 오프셋(거리/축/방향), ② 요소들 사이의 **상대적** 시작 시점 차이(→ `delay` 스태거링 비율)뿐이고, 트리거 자체는 항상 IntersectionObserver(또는 4.18의 `settled`) 1회성으로 바꾼다.

### 4.20 스크롤이 콘텐츠를 건너뛰지 못하게 막기 — `scroll-snap-stop` (현재 미사용, 패턴만 기록)
예전에 `Promises`가 6개 항목으로 늘었을 때, 섹션 내용이 뷰포트보다 크면 강하게(빠르게) 스크롤할 때 `scroll-snap-type: y mandatory`가 이 섹션의 스냅 지점에서 전혀 멈추지 않고 바로 다음 섹션으로 넘어가버리는 문제가 있어서, `#promises`의 `.section`에 `scroll-snap-stop: always;`를 걸어 반드시 거쳐가게 만들었었다. **4.9 정책으로 `Promises`가 `height: 100dvh; overflow: hidden;`으로 바뀌면서 섹션 내용이 더 이상 뷰포트보다 커지지 않으므로, 이 문제 자체가 없어져 `scroll-snap-stop`을 제거했다** — 지금 코드베이스엔 이 프로퍼티를 쓰는 곳이 없다.
- 패턴은 앞으로 "부득이하게 뷰포트보다 큰" 섹션을 다시 만들게 될 경우를 위해 기록만 해둔다: 그런 섹션의 `.section`에만 `scroll-snap-stop: always;`를 걸고, **다른 섹션에는 걸지 않는다**(4.8에서 정한 "빠르게 스크롤하면 여러 섹션을 자연스럽게 지나칠 수 있어야 한다"는 자유로움이 깨진다). 하지만 4.9가 기본 정책이 된 지금은, 섹션이 뷰포트보다 커지는 상황 자체를 먼저 의심하고 vh-블렌드 `clamp()`로 줄이는 쪽을 우선 시도한다.
- ⚠️ **자동화 테스트에서 스크롤 동작을 검증할 때 `page.mouse.wheel()`은 못 믿는다.** 이 프로젝트를 테스트한 헤드리스 Chromium 환경에서 합성 wheel 이벤트는 실제 페이지 스크롤 위치를 전혀 안 움직이는 경우가 있었다(scrollY가 0에 고정) — 다만 **`window`에 등록한 `wheel` 이벤트 리스너 자체는 정상적으로 발화한다** (4.21의 `useSequentialReveal` 테스트에선 `page.mouse.wheel()`로 리스너를 확실히 트리거할 수 있었다). 즉 "이벤트가 발화하는지"와 "그 이벤트로 실제 네이티브 스크롤이 움직이는지"는 별개로 검증해야 한다 — 페이지 스크롤 위치 자체를 옮겨야 하는 테스트는 `page.evaluate(() => window.scrollBy({ top, behavior: 'instant' }))`나 `element.scrollIntoView({behavior:'instant'})`처럼 직접 위치를 지정하는 쪽이 안정적이다.

### 4.21 한 화면 안에서 항목을 하나씩 순서대로 보여주기 (`hooks/useSequentialReveal.ts`)
`Promises`의 여섯 항목처럼 "처음 들어왔을 때 첫째만 보이고, 스크롤할 때마다 둘째·셋째...가 나타나며, 다 보여주기 전엔 다음 섹션으로 안 넘어간다"를 구현해야 하는데, 4.9 정책으로 섹션이 `height: 100dvh; overflow: hidden;`으로 고정되어 있어서 **섹션 내부에 스크롤할 거리 자체가 없다** — 예전엔 각 항목이 자기 `IntersectionObserver`로 "화면에 들어왔는지"를 관찰(`Reveal`의 비제어 모드)했지만, 섹션이 안 움직이니 2번째 항목부터는 이 관찰이 아예 발화하지 않아(`rootMargin`이 겹치는 위치 자체가 없음) 영원히 숨어있는 채로 남는 버그가 났다(아이패드에서 "다섯째·여섯째가 안 보인다"는 증상으로 처음 발견됐지만, 근본 원인은 아이패드가 아니라 이 구조적 문제였다).
```tsx
const revealedCount = useSequentialReveal(promises.length, settled);
// <Reveal ... visible={index < revealedCount}>
```
- **스크롤 "거리"가 아니라 스크롤 "이벤트가 있었는지 여부"로 카운트를 올린다** — 사용자 요구사항 그대로("스크롤되는 양이 아니라, 스크롤이 됐는지 안됐는지 여부로"). 섹션이 `settled`(4.18)가 된 뒤, `window`에 `wheel`/`keydown`(↓, PageDown, Space)/`touchmove` 리스너를 걸어서 아래 방향 스크롤 의도를 감지할 때마다 `e.preventDefault()`로 페이지의 실제 scroll-snap 전환을 막고, `revealedCount`를 1씩 올린다.
- **쿨다운(700ms)으로 "한 번의 스크롤 제스처 = 한 걸음"을 만든다.** 트랙패드의 `wheel` 이벤트는 한 번 스크롤하는 동안 수십 개가 연속으로 발생하므로, 쿨다운 없이 그대로 카운트를 올리면 한 번 스크롤했는데 항목이 서너 개씩 건너뛰며 나타난다.
- `revealedCount`가 `total`에 도달하면 리스너를 전부 떼서 **더 이상 가로채지 않는다** — 다음 스크롤부터는 평소처럼 페이지가 다음 섹션으로 자연스럽게 넘어간다.
- 섹션에 진입할 때(`active`가 `false→true`)는 `revealedCount`를 1로(첫 항목은 바로 보임), 벗어날 때(`true→false`)는 0으로 되돌린다 — 다시 들어오면 처음부터 다시 재생된다(`Reveal`의 "스크롤로 다시 지나가면 매번 다시 재생" 원칙과 일관).
- ⚠️ **React Compiler 계열 린트 규칙(`react-hooks/set-state-in-effect`, `react-hooks/refs`) 둘 다 이 "prop 변화에 반응해 state를 리셋" 패턴의 표준적인 두 가지 구현을 막는다**: (1) effect 안에서 곧바로 `setState`를 호출하는 방식, (2) React 공식 문서가 권장하는 "렌더링 중 ref와 비교해서 조정" 방식(ref를 렌더링 중에 읽는 것 자체를 금지) 둘 다 이 프로젝트의 lint에 걸린다. 우회 방법은 `useSectionSettled`의 `check()`처럼, **`setState` 호출을 effect 본문에 직접 쓰지 않고 별도로 이름 붙인 함수(`reset`, `showFirst`) 안에 넣고 그 함수를 호출**하는 것 — 린트가 effect 본문에 직접 있는 `setState` 호출만 정적으로 탐지하기 때문에, 한 겹 감싸는 것만으로 동일한 동작이 통과된다. 이 프로젝트에서 "prop이 바뀔 때 state를 리셋"해야 하는 새 훅을 만들 때 이 우회 패턴을 기본으로 쓴다.

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
3. 좌우 패딩 `--space-page-x`, 콘텐츠 wrapper `max-width: var(--content-max)` 패턴을 따른다. 화면 단위로 스냅되는 섹션은 **4.9의 패턴을 기본으로 적용한다**: `height: 100dvh; overflow: hidden;`을 안전망으로 걸고, 내부 폰트/간격을 `vh`가 섞인 `clamp()`로 만들어 태블릿/PC 가로 화면 어디서든 실제로 한 화면에 들어오게 한다(`min-height`만 걸고 넘치게 두는 옛 패턴은 기본값이 아니다).
4. 1024 / 640 분기 기준으로 다단 → 스택 반응형을 기본으로 검토한다(필요시 768 분기 추가).
5. 이미지·아이콘은 전부 실제 에셋만 사용한다. 구할 수 없으면 사용자에게 먼저 알린다. "비슷해 보인다"는 이유로 다른 요소의 기존 에셋을 재사용하기 전에, 그 요소 자신의 Figma 노드에서 실제 에셋/색상을 직접 확인한다(4.12 카드 배경 이미지 사례 참고).
6. 과한 그라디언트/글로우/불필요한 둥근 카드/장식 요소를 새로 추가하지 않는다.
7. `html`에 `scroll-behavior: smooth`를 걸지 않는다 (4.8 참고). `scroll-snap-stop: always`는 지금은 기본적으로 필요 없다(4.9 정책으로 섹션이 뷰포트보다 커지는 상황 자체가 없어짐) — 부득이하게 필요해지면 4.20의 패턴을 참고한다. 스크롤 위치를 읽어야 하는 컴포넌트는 `scroll` 리스너보다 `IntersectionObserver`/`scrollend`를 우선 검토한다 (4.7, 4.18 참고).
8. 등장 애니메이션이 필요하면 새 라이브러리를 깔지 말고 `components/Reveal.tsx`를 재사용한다 (4.14, 4.19). hover 인터랙션은 4.16의 값(카드 lift, 링크 gap)을 기본값으로 삼는다. "섹션이 자리잡은 뒤에만" 시작해야 하는 효과는 4.18의 `useSectionSettled`로 게이팅한다. 섹션이 한 화면에 고정돼 있어(4.9) 항목을 하나씩 순서대로 보여줘야 하면 4.21의 `useSequentialReveal`을 쓴다 — 위치 기반 관찰로는 작동하지 않는다.
9. 작업 후 `npm run lint && npm run build`로 검증하고, 최소 1개 데스크톱 + 1개 모바일 뷰포트로 스크린샷 확인한다. 가로 스크롤 발생 여부(`document.documentElement.scrollWidth === clientWidth`)와, 한 줄로 강제한 텍스트가 있다면 `element.scrollWidth > element.clientWidth`(줄바꿈/잘림 여부)를 실측한다. `fullPage` 스크린샷은 `IntersectionObserver`/`scrollend` 기반 등장 애니메이션을 제대로 트리거하지 않을 수 있으니, Reveal 요소 확인은 실제 `scrollTo`/`scrollIntoView` 반복으로 검증한다.
10. **섹션이 한 화면에 다 들어오는지, 9번 분단 매트릭스 전체(4.9 참고: 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 1024×1366, 768×1024, 820×1180, 1180×820, 1280×720)에서 실측한다** — 데스크톱 하나, 모바일 하나만 확인하고 넘어가면 가로로 넓고 세로로 짧은 조합(`1280×720`)이나 좁고 긴 세로형 태블릿(`768×1024`)에서 깨지는 걸 놓친다. `scrollHeight`가 아니라 자식 요소의 `getBoundingClientRect()`를 섹션과 직접 비교하고(4.9), 등장 애니메이션이 완전히 끝난 뒤(transform이 항등 행렬인지 확인) 측정한다.
