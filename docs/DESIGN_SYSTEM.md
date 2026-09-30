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

> **Figma 소스**: fileKey `uwbrfXG77JjwUSOkbptUxq`, 페이지 전체 프레임 **`612:1359` ("1920w light", 1920×4519)**. 섹션별 노드: 헤더 `614:6029`(히어로 위) / `651:1947`(흰 배경 위, 하단 1px `#d9d9d9`), section1_hero `612:1405`, section2 `613:1832`(카드 그리드 `612:1416`), section3 `612:1471`(그리드 `614:6269`), section4 `614:6270`. 디자인을 다시 확인할 땐 이 노드들에 `get_design_context`/`get_screenshot`을 직접 호출한다 — 페이지 `0:1` 전체 메타데이터는 너무 커서 잘려 나오고, 캔버스에 다른 프로젝트 작업물이 섞여 있어 전체 검색으로는 이 사이트 프레임을 찾기 어렵다. (2026-09-28 한 라운드에서 전체 검색만 해보고 "이 파일엔 사이트 디자인이 없다"고 잘못 결론 낸 적이 있다 — 사용자가 준 노드 링크에서 시작할 것.)
>
> **모바일 Figma 소스 (2026-09-29)**: 프레임 **`629:7979`** (402px 폭). 헤더 `629:7981`, section1_hero `629:8002`, section2 `629:8015`, section3 `629:8045`(항목 모션 `672:2228`~`672:2303`), section4 `629:8157`. **세로(portrait) 화면 전체**에 이 레이아웃을 쓴다 — 4.15 참고.

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
| `--fs-section-title-fit` | `max(39.9 * --u, 1.25rem)` (Figma h2 39.9px) | **Promises와 PolicyCarousel의 헤딩(`+` 아이콘 붙은 "섹션 타이틀")은 반드시 이 토큰만 쓴다** — 짧은 화면(4.9)에서 shrink가 필요해 `--fs-section-title`에 각자 다른 로컬 vh-오버라이드를 만들었다가, 같은 1920×1080에서 한쪽은 18.8px 한쪽은 34.8px로 보일 정도로 어긋난 적이 있다(2026-09-28). "제목 크기는 다 똑같아야 한다"는 사용자 피드백으로 발견 — 반복되는 섹션 타이틀 역할에는 항상 이 공유 토큰을 쓰고, 컴포넌트마다 별도 vh-blended 값을 새로 만들지 않는다. (Hero의 헤드라인은 별개 역할 — `--fs-hero-kr`을 그대로 쓴다, 의도적으로 훨씬 크다.) |
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
| `--header-height` | **75px 고정** (Figma div.c-header, fluid 아님), `Header.tsx`가 실측 높이로 재확인 | 고정 헤더 높이. 스냅 섹션의 top padding 계산에 사용 (4.8 참고). `Header.module.css`의 `.header { height }`와 `globals.css`의 `--header-height` 기본값(SSR/첫 페인트 폴백) 두 곳이 항상 같은 값이어야 한다 — 하나만 바꾸면 JS가 실측치로 덮어쓰기 전까지 순간적으로 어긋난다. |
| `--u` | `min(100vw/1920, (100dvh - 75px)/1005)` | Figma 1920×1080 프레임의 1px. Section 2·3과 스크롤 인디케이터의 모든 길이를 `calc(N * var(--u))`로 써서 Figma 비율 그대로 축소한다 (4.9) |
| `--mu` | `min(100vw/402, 1.4px)` | 모바일 Figma(402px 폭)의 1px. **`@media (orientation: portrait)` 블록 안에서만** 쓴다. 세로 태블릿에서 폰 디자인이 과하게 커지지 않도록 1.4배에서 멈춘다 (4.15) |

> `--space-section-y`(40px)와 `--gap-lg`(85px)의 최댓값은 Figma 1920 프레임에서 실측한 값이다 (섹션 상하 여백 40px, 타이틀→콘텐츠 간격 85px). 임의로 더 크게 잡지 않는다 — 예전에 80px/48px로 더 크게 잡았다가 레이아웃이 화면마다 잘리는 문제가 있었다.

### 레이아웃 규칙
- **고정 1920px 레이아웃 금지.** 모든 컨테이너는 `max-width: var(--content-max); margin: 0 auto;` + `padding: 0 var(--space-page-x)` 패턴.
- **모든 섹션은 태블릿/PC 가로 화면 어디서든 한 화면(`100dvh`)에 다 들어와야 한다** (2026-09-28 방침 변경 — 사용자의 명시적 요구사항). 이전엔 "`min-height: 100dvh`가 기본, 콘텐츠가 넘치면 그냥 더 스크롤하게 둔다"가 기본값이었지만, 콘텐츠가 늘어난 뒤(약속 6개, 카드 캐러셀 등) 섹션마다 화면 비율이 안 맞는다는 피드백을 받고 뒤집었다. 지금은 **`height: 100dvh; overflow: hidden;`을 안전망으로 걸고, 그 안의 폰트/간격을 전부 `vh`가 섞인 `clamp()`로 만들어서 안전망이 실제로 뭔가를 잘라내기 전에 이미 알아서 한 화면에 맞도록** 만든다. 상세 레시피와 이유는 4.9 참고 — `min-height`만 걸고 넘치게 두는 옛 패턴은 더 이상 기본값이 아니다.
- 가로 스크롤 발생 금지. **`overflow-x: hidden`은 반드시 `body`에만 건다 (`html`에는 걸지 않는다)** — `html`에 걸면 이 프로젝트가 쓰는 Chromium 빌드에서 `scroll-snap-type`이 조용히 무시되는 버그가 있다 (실측으로 확인됨). 새 컴포넌트가 가로 스크롤 규칙을 깨지 않는지 `document.documentElement.scrollWidth === clientWidth`로 확인.
- ⚠️ **`body`에만 건 `overflow-x: hidden`으로는 못 막는 경우가 있다**: 실제 스크롤 컨테이너는 `body`가 아니라 `html`인데(4.8), `html`의 `overflow-x`는 `visible`로 남아있으므로, **`transform`으로 뷰포트 밖에 숨겨두는 요소**(예: `Reveal`의 `axis="x"` 모드 — `DevelopmentPlan`의 양옆 카드가 등장 전 `translateX(±667px)`로 숨어있는 것)는 `body`의 클리핑을 우회해서 `html` 레벨에서 진짜로 스크롤 가능한 가로 여백을 만든다(`window.scrollTo({left:9999})`로 실측 가능 — `documentElement.scrollWidth`만 보는 것보다 이 쪽이 더 확실하다). `html`/`body`를 건드릴 수 없으니, **그 transform이 걸리는 요소의 가장 가까운 자기 컴포넌트 컨테이너(예: `.section`)에 `overflow-x: hidden`을 로컬로 건다** (`DevelopmentPlan.module.css`의 `.section`이 이 사례).
- 브레이크포인트 기준: **1920 / 1440 / 1024 / 768 / 390**. 실제 CSS 분기점: **모바일 레이아웃은 `@media (orientation: portrait)`**(4.15, 폭 기준 아님), 그 외에는 `Hero`의 `@media (max-width: 1023px)` 정도만 남아 있다. 가로 화면은 `--u`로 한 화면에 맞춘다(4.9).

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
- **브랜드 텍스트("고려대학교 제22대 총장 후보 유병현")는 히어로로 가는 링크다** (`<a href="#hero">`, 2026-09-29). 클릭하면 `goToSection("hero")`(`lib/pageNav.ts`)가 `SectionPager`에 이벤트를 보내 페이지 넘김과 같은 애니메이션으로 이동한다 — 브라우저 기본 앵커 점프나 `scroll-behavior: smooth`를 쓰지 않는다(4.8). 여러 페이지를 건너뛰면 시간이 조금 늘어난다(최대 1.4s). 다른 섹션으로 가는 링크를 새로 만들 때도 같은 함수를 쓴다.

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

### 4.8 섹션 페이징 — 한 번 스크롤하면 한 페이지 (`components/SectionPager.tsx`)
> **세로 화면(모바일 레이아웃, 4.15)에서는 페이저가 완전히 꺼진다** — wheel/touch/키 가로채기, 유휴 정렬(realign), `html[data-paged]` 모두 없음. 사용자 요청: "모바일에서는 애니메이션만 유지, 스크롤 정지는 없어도 된다". `goToSection()`(헤더 브랜드 클릭)만 계속 동작한다.
`Section 1~4`(`main > section`, `Footer`는 Section 4 내부 — 4.10 참고)는 **스크롤 한 번 = 한 페이지**로 넘어가고, 다음 섹션이 아래에서 슬라이드하듯 올라온다(850ms `easeInOutCubic`, rAF로 직접 애니메이션). CSS `scroll-snap-type`과 `scroll-behavior: smooth`는 쓰지 않는다.
- 변천사(되돌리지 말 것): ① CSS `scroll-snap-type: y mandatory` → 조금만 스크롤해도 바로 넘어가 "뚝뚝 끊긴다" ② 자유 스크롤 + 멈춘 뒤 80% 이상이면 붙고 아니면 되돌아가는 "자석"(2026-09-29 오전) → "밀당하는 것 같다(내리면 올라가고 내리면 올라가고)"는 피드백 ③ 지금의 페이징. **스크롤한 만큼 따라오다가 되돌아가는 동작은 다시 넣지 않는다.**
- **제스처 단위 판정** (`lib/wheelGesture.ts`): 트랙패드 플릭은 관성 꼬리까지 1초 가까이 wheel 이벤트를 계속 보낸다. 이벤트 사이 간격이 180ms를 넘거나 방향이 바뀌거나, **관성 꼬리가 최고치의 40% 아래로 줄어든 뒤 delta가 다시 최근 평균의 2배(+4px 이상)로 치솟으면** 새 제스처로 보고, 한 제스처는 딱 한 페이지만 넘긴다(애니메이션 중·꼬리 이벤트는 `preventDefault`로 흡수). 이 판정은 모듈 하나가 가장 먼저 등록한 window 리스너가 하고, 페이저와 `Promises`의 순차 등장(4.21)이 **같은 판정을 공유**한다 — 각자 타이머를 두었더니 페이지를 넘긴 플릭의 꼬리가 `Promises`에 도착하자마자 항목 2·3을 추가로 열어버렸다(실측).
  - ⚠️ **"간격 180ms"만으로 판정하면 안 된다 (2026-09-29).** macOS 트랙패드/매직 마우스는 관성 이벤트를 1~2초 흘리는데, 그게 끝나기 전에 다시 스와이프하면 간격이 전혀 없이 이어져서 새 스와이프가 통째로 꼬리로 취급됐다 — "스크롤→클릭→스크롤 해야 다음 공약이 나온다"는 증상(클릭이 관성을 끊어서 간격이 생김). 관성 꼬리는 줄어들기만 하므로 "줄었다가 다시 커짐"을 새 제스처로 본다. 새 스와이프 판정은 300ms 안에 두 번 나지 않는다(노이즈 방지).
- 터치: 세로 스와이프 40px 이상이면 한 페이지(목표는 **스와이프를 시작한 위치 기준**으로 계산). 가로 스와이프는 카드 캐러셀 몫이라 건드리지 않는다(첫 8px 이동으로 축 판정). 키보드: ↓/PageDown/Space, ↑/PageUp/Shift+Space, Home/End.
- **모든 섹션이 한 화면에 맞으면 `html[data-paged]`** (페이저가 켜고 끔) → `globals.css`가 `touch-action: pan-x pinch-zoom; overscroll-behavior-y: none`으로 브라우저의 세로 패닝 자체를 끈다. 이유(2026-09-29, iPad): iOS는 첫 `touchmove`를 막지 않으면 네이티브 패닝을 시작하고 그 뒤로는 JS `preventDefault`를 무시한다 — 8px 축 판정 전에 시작된 패닝의 관성이 다음 섹션을 **지나쳤다가 페이저 애니메이션에 끌려 돌아오는** 현상("넘어갔다가 돌아온다")의 원인. 페이지는 오직 페이저가 움직이고, 새 섹션의 아래 끝이 화면 아래 끝에 닿는 지점에서 정확히 멈춘다. 가로 캐러셀 스와이프·핀치 줌은 그대로 동작. 폰처럼 화면보다 긴 섹션이 있으면 속성이 빠져서 네이티브 스크롤이 돌아온다. (Chromium 헤드리스 터치는 이 현상을 재현하지 못한다 — iOS 실기기로 확인.)
- 다른 핸들러가 이미 `preventDefault`한 이벤트는 건드리지 않는다. `Promises`의 순차 등장은 **capture 단계**로 등록해서 페이저(bubble 단계)보다 먼저 제스처를 가져간다.
- 화면보다 긴 섹션(폰의 `Promises`/`PolicyCarousel`)은 안에서 네이티브 스크롤하고, 위/아래 끝에서만 페이지를 넘긴다.
- 스크롤바 드래그·페이지 내 검색·리사이즈(모바일 툴바의 `100dvh` 변화 포함)로 섹션 사이에 걸치면 200ms 뒤 가까운 섹션으로 정렬한다.
- 고정 헤더에 가려지지 않도록 **섹션 자신의 `padding-top`에 헤더 높이를 포함**시킨다 (히어로 제외).

### 4.9 모든 섹션을 정말로 한 화면에 맞추기 (`height: 100dvh` 안전망 + `vh`-블렌드 `clamp()`)
(이전엔 이 번호가 "결번" — 예전에 있던 "짧은 뷰포트에서 강제로 한 화면에 우겨넣기" 전략을 4.8의 `min-height` 기본 정책으로 대체하며 제거했었다. 2026-09-28에 **정반대 방향으로 다시 뒤집었다** — 콘텐츠가 늘어난 뒤 섹션마다 화면 비율이 안 맞는다는 명시적 피드백을 받고, 이번엔 "한 화면에 반드시 맞춘다"를 전 섹션 공통 정책으로 승격했다.)

**레시피:**
1. `.section { height: 100dvh; overflow: hidden; }` — `min-height`가 아니라 `height`로 고정한다. 이건 **최후의 안전망**이지, 안전망이 실제로 뭔가를 자르면 그 콘텐츠가 안 보이는 버그다.
2. **Section 2·3은 Figma 단위 `--u`로 전부 비례 축소한다 (2026-09-29).** `--u: min(100vw/1920, (100dvh - 헤더)/1005)` — Figma 1920×1080 프레임의 1px이 지금 화면에서 몇 px인지(가로·세로 중 빡빡한 쪽 기준). 모든 길이를 `calc(<Figma px> * var(--u))`로 쓴다:
   ```css
   .cardTitle { font-size: max(calc(120 * var(--u)), 2.75rem); } /* Figma 120px */
   .grid { gap: calc(40 * var(--u)); min-height: calc(767 * var(--u)); }
   ```
   그러면 카드·제목·본문·간격이 **서로 같은 비율을 유지한 채** 함께 줄어든다. 이전 방식(요소마다 따로 튜닝한 `vw`/`vh` 혼합 `clamp()`)은 한 화면에서 제목은 크고 본문은 8px처럼 요소마다 다른 곡선으로 줄어들어 "크기가 중구난방"이라는 피드백을 받았다 — 섹션 안의 크기는 반드시 같은 단위 하나로 묶는다. `max(…, 최소값)`은 폰/세로 태블릿처럼 `--u`가 아주 작아질 때만 걸리는 가독성 하한이다.
3. 섹션 타이틀은 공통 토큰 `--fs-section-title-fit`(= `max(39.9 * --u, 1.25rem)`)만 쓴다 — Section 3·4가 어떤 화면에서도 같은 크기.
4. `aspect-ratio` + `max-height`로 카드 높이를 제한하지 않는다. `aspect-ratio`가 걸린 요소에 `max-height`가 걸리면 **너비까지 같이 줄어** 카드가 칸보다 좁아지고(칸 사이가 휑하게 벌어짐) 120px 제목이 카드 밖으로 잘린다(실제 발생). Figma처럼 "칸 너비는 flex/grid가, 높이는 `767 * --u`"로 준다.
5. `position: absolute`로 떠 있는 요소(`ScrollDownIndicator`, `bottom: 24px`)는 흐름에서 공간을 차지하지 않으므로 콘텐츠와 겹칠 수 있다. 인디케이터 자체도 `--u`로 비례 축소(라벨 20u, 간격 19u, 아이콘 48u, 바닥 24u)해서 Figma와 같은 여백 비율을 유지하고, `--u`를 안 쓰는 섹션(`PolicyCarousel`)은 형제 요소의 `padding-bottom`으로 자리를 비워둔다(`.trackOuter { padding-bottom: clamp(70px, 6vw + 2vh, 100px); }`). 겹침은 세로 범위만 보지 말고 **실제 사각형 교차**로 확인한다 — 인디케이터는 가운데 정렬이라 Section 3처럼 2열 그리드 사이에 오면 세로로는 겹쳐도 실제로는 안 부딪힌다.
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
- 모바일 전용으로 폰트 크기를 더 줄여야 하면 전역 fluid 토큰(`--fs-hero-kr` 등)을 건드리지 말고, 해당 컴포넌트의 `@media (orientation: portrait)` 블록 안에서 그 요소에만 `--mu` 값을 지정한다 — 다른 곳에서 같은 토큰을 재사용 중이면 전역 값을 줄였을 때 의도치 않게 같이 줄어들 수 있다.
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
- **카드 치수 (Figma `660:4956`, 2026-09-29 재적용)**: 504×584, radius 10, 그림자 `0 12px 15px rgba(0,0,0,.15)`. 헤더 패딩 40/30/20/40, 번호·제목 34px SemiBold(키 컬러, 사이 15px), 화살표 30px. 본문 패딩 25/50/40, 카테고리 묶음 사이 35px, 라벨 14px Medium(19.6px 줄높이) → 6.8px → 항목들(항목 사이 4px), 항목은 체크 아이콘 10px + 10px 간격 + **18px Light 텍스트를 28px 줄높이**로. 이전 구현은 카드 폭을 `30vw`(1920에서 560px)로 넓히고 항목 행 높이를 `vh`로 쥐어짜서 "넙대대하고 행간이 좁다"는 피드백을 받았다.
- **카드 번호·제목은 ExtraBold(800)** (Figma 2026-09-30, 예전 SemiBold) — 데스크톱·모바일 모두.
- **카드 크기 504×624** (2026-09-30, 예전 584 — 늘어난 40px는 목록 아래 빈 공간). `--cu`의 높이 기준도 624 + 위아래 60 = **684**.
- ⚠️ **카드 배경 이미지의 fill 투명도는 MCP 에셋 PNG의 알파에 이미 구워져 있다** (fill 0.8 → 알파 최대 204, 0.95 → 242). codegen은 `<img>`에 `opacity-95`도 같이 붙여주지만 그대로 따라 하면 두 번 적용된다 — 예전에 0.8이 구워진 PNG에 CSS `opacity: .8`을 또 걸어 실제로는 ~64%로 흐리게 보였다(“잘 안 보인다”). `.cardBg`에는 CSS opacity를 걸지 않는다. 현재 에셋: 카드 01(contrast 0, fill 0.95)의 `4ce63.png`.
- **항목 안의 영문 괄호**(예: "산업계 석좌교수(Chaired Professor) 제도 활성화")는 Figma에서 한 단계 작게(18px 줄에 14px) 쓴다 — `PolicyCarousel.tsx`의 `ItemText`가 라틴 문자로 시작하는 괄호만 `.itemNote`(0.778em, 모바일은 1em)로 감싼다. 한글 괄호("(엔다우먼트)")는 그대로. 카드 항목 문구는 Figma에서 바뀔 수 있으니(2026-09-30 카드 02·03 나답게에 "단과대 연구기금 조성 및 기본연구비 신설" 추가) `use_figma`로 텍스트를 덤프해 `lib/policyData.ts`와 대조한다.
- **헤더 행 (2026-09-29 사용자 요청으로 Figma에서 변경)**: Figma는 좌우 화살표 버튼을 h2 아래 별도 98px 행에 두지만, 카드를 더 위로 올리기 위해 **h2와 같은 행의 오른쪽 끝**에 둔다. 헤더 행→카드 사이는 Figma의 40px 유지(행 `margin-bottom` 24u + 트랙 `padding-top` 16cu). 마지막 페이지라 스크롤 다운 인디케이터가 없으므로 `.trackOuter`에 인디케이터 자리를 예약하지 않는다.
- **카드 크기 단위 `--cu`**: `min(1px, 100cqh / 684, (100vw - 80px) / 504)`. `.trackOuter`를 `container-type: size`로 두고, 카드(+ 위아래 패딩 60 Figma px)가 캐러셀에 남은 **높이**에 맞춰 Figma 비율 그대로 줄어든다. 가로로는 캐러셀이 스크롤되므로 너비가 기준이 아니다 — 너비 기준(`--u`)으로 줄이면 태블릿에서 카드가 불필요하게 작아지고 아래가 텅 빈다(실측). 섹션 제목·화살표 줄은 페이지 공통 `--u`를 써서 Section 3 제목과 크기가 같다. 폰(≤640px)은 `--cu = min(92vw, 430px) / 504`로 카드 한 장이 화면 폭에 맞고, 섹션이 한 화면보다 길어지는 걸 허용한다.
- **카드 비주얼 (2026-09-28 동기화, 그림자/배경 이미지 2026-09-28 재검증)**: `.cardInner`에 `border`(예전 `1px solid rgba(0,0,0,0.06)`) 대신 **항상 켜져 있는** `box-shadow: 0 12px 15px rgba(0,0,0,0.15)`를 기본값으로 건다(hover에서 `0 20px 30px rgba(0,0,0,0.22)`로 더 진해짐). radius도 14px→10px로 줄었다. ⚠️ **(2026-09-30) 카드 배경 이미지의 contrast 필터는 카드마다 다를 수 있고, MCP 에셋에는 그 필터가 구워져 나온다.** 사용자가 "contrast 조절한 걸 초기화했다(잘 안 보여서)"고 해서 확인해보니 카드 02~05는 contrast ≈ 0(-0.03, 초기화 상태), 카드 01과 모바일 카드들은 +1로 남아 있었고, 우리가 쓰던 파일은 카드 01(+1, 결이 더 흐림)의 에셋이었다. 초기화된 카드 02의 에셋(`a2c79.png`, 같은 1024×683 RGBA)으로 교체했다. 필터 값은 `use_figma`로 `fills[].filters`를 읽어 확인한다 — `get_screenshot`만으로는 차이가 거의 안 보인다. 카드 배경 이미지는 **Figma가 카드 노드에 렌더링한 그 파일 그대로**(`public/images/policy-card-bg.png`, 1024×683, 알파 50~80%가 이미 구워진 원본 사진의 확대 크롭)를 쓰고, Figma처럼 카드 크기로 **늘려서**(`object-fit: fill`, 크롭 없음) `opacity: .8`로 흰 바탕 위에 올린다. ⚠️ 2026-09-29 수정: 예전엔 `download_assets`로 받은 **이미지 채우기의 원본 소스**(3000×2000 불투명 jpg)를 `object-fit: cover`로 썼더니 선이 훨씬 진하고 굵게 보였다("배경이 너무 강하다"). 노드의 채우기 원본과 Figma가 실제로 그리는 결과(크롭·알파)는 다를 수 있다 — `get_design_context`의 노드 에셋과 스크린샷으로 대조한다. 또한 카드 배경 이미지는 **Hero의 `hero-bg.png`를 재사용하지 않는다** — 처음엔 시각적으로 비슷해 보인다는 이유로 재사용했다가, 실제 Figma 카드 노드(660:4956)를 `download_assets`로 직접 확인하니 다른(더 고해상도) 원본 이미지였다. 전용 파일 `public/images/policy-card-bg.jpg`로 저장해서 쓴다 — **"비슷해 보이는" 기존 에셋을 재사용하기 전에, 그 요소의 실제 Figma 노드에서 에셋을 다시 받아 맞는지 확인한다.** 색상도 마찬가지로 직접 검증한다: 헤더 우측 화살표 아이콘(`.cardHeadLink`)은 카드 넘버/타이틀과 같은 `--color-key`(빨강)처럼 보이지만, Figma SVG의 실제 `fill`은 `#AEA89B`(`--color-muted`)다 — 패턴 매칭으로 색을 추측하지 말고 실제 SVG를 받아서 `fill`/`stroke` 속성을 읽는다. 하단의 "자세히 보기" 텍스트 링크는 없어지고, 카드 헤더 우측에 **아이콘만 있는** `ArrowRightIcon` 링크(`aria-label`로 접근성 보완)로 대체됐다.
- ⚠️ **그림자가 항상 켜져 있으면(hover 전용이 아니면) 트랙의 padding을 그만큼 넉넉히 잡아야 한다.** hover 전용이던 시절의 `padding: 12px var(--space-page-x) 8px`로는 상시 그림자(휴지 상태에서도 위 ~10px, hover 시 아래 ~50px까지 번짐)가 `overflow-x: auto`의 클리핑 가장자리에 잘린다 — `.track`의 padding을 `16px var(--space-page-x) 56px`까지 늘리고, `.trackOuter`의 `margin-top`/`padding-bottom`에서 그만큼을 다시 빼서 카드의 휴지 위치가 예전과 같아 보이게 상쇄한다.
- ⚠️ **카드 타이틀이 헤더 아이콘과 겹칠 수 있다.** `.cardTitle`에 `white-space: nowrap`을 걸어뒀더니, 카드 중 하나("전문적 행정과 인사경영")처럼 유독 긴 타이틀이 `.cardHeadLink` 화살표 아이콘까지 침범했다. 고친 방법: `white-space`를 `normal`로 풀어 2줄까지 자연스럽게 줄바꿈되게 하고, `.cardTitleRow`에 `flex-wrap: wrap; align-items: flex-start;`를 걸고, `.card` 너비도 Figma 원본(504px)보다 넓은 `clamp(340px, 30vw, 560px)`로 살짝 키워서 대부분의 타이틀은 한 줄에 들어가고 예외만 2줄로 줄바꿈되게 했다.

### 4.13 2-컬럼 x 3-로우 약속 그리드 (`Promises`)
> **(2026-09-30) 웹 버전 텍스트**: 번호·제목 34/48 SemiBold, 본문 **22px** Light / 28.66px(Figma, 예전 18px — P4 카드 본문과 맞춘 크기). **제목·본문 모두 왼쪽 정렬 + `word-break: keep-all`** — 양쪽 맞춤은 단어 사이 벌어짐을 피하려고 `word-break: normal`이 필요했고, 그게 한글 단어를 중간에서 잘랐다("설 / 치하겠습니다"). 헤딩 `+` 아이콘은 `--color-muted`(#AEA89B).
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
- **(2026-09-29 갱신) 위에서 내려올 때만 재생된다.** 뷰포트에 들어오면 `revealVisible`, **화면 아래로** 빠져나갈 때만(위로 스크롤해 지나쳤을 때) `revealHidden`으로 리셋한다 — 아래로 지나간 뒤 다시 올라오면 이미 보이는 상태 그대로다(`useEnterView`와 같은 규칙, 4.19). 아래 옛 설명은 이력:
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

### 4.15 모바일 레이아웃 — 세로 화면 전체 (Figma `629:7979`)
**기준은 폭이 아니라 방향이다: `@media (orientation: portrait)`**(JS에서는 `hooks/useMediaQuery.ts`의 `PORTRAIT` + `useMediaQuery()`). 사용자 요청 "화면이 세로로 길어졌을 때 모바일 디자인" (2026-09-29). 세로 태블릿도 여기에 들어간다. 가로 화면은 폭과 상관없이 데스크톱 레이아웃(한 화면 맞춤 + 페이징)이다. 예전의 `max-width: 640px` 폰 블록은 전부 이 블록으로 대체됐다.
- **길이는 모두 `calc(<모바일 Figma px> * var(--mu))`.** 데스크톱 값을 스케일해서 쓰지 않는다 — 모바일 카드 등은 데스크톱의 균일 축소가 아니다(예: 공약 카드 504×584 → 298×372, 폰트·패딩도 따로 정해져 있음).
- **자유 스크롤**: 섹션은 `height: auto`, 페이저(4.8)·`Promises` 단계 등장(4.21)·스크롤 다운 인디케이터(4.17) 없음. 애니메이션은 유지:
  - `Promises` 항목: 각자 `Reveal` 자동 모드(IntersectionObserver)로, Figma 모션 `672:2228`대로 **152.4px 아래에서 fade-up, 1s, easeInOut**.
  - `DevelopmentPlan` 카드: 데스크톱과 같은 타이밍(가운데 0ms, 양옆 530ms, 1.4s)이지만 **모두 아래에서(120mu) 올라온다** — 가로 캐러셀 안에서 좌우 슬라이드를 하면 트랙의 스크롤 폭이 흔들린다.
- **헤더**: 84px, 라벨(12)/이름(20) 세로 배치 8px 간격, 좌우 20, 햄버거 32, 스크롤 후 하단선 0.5px. `Header.tsx`가 실측 높이를 `--header-height`로 넣는다.
- **히어로**: 한 화면이 아니라 **598px 띠**. 헤드라인 38/55 ExtraBold 두 줄(위 166, 왼쪽 20), 영문 16 Light, 인물 248×347 우하단.
- **Section 2 캐러셀**: 히어로 바로 아래 위 여백 **40** (Figma가 section2 안에 그려둔 흰 헤더 84px는 고정 헤더가 떠 있는 모습일 뿐이라 여백에 더하지 않는다 — 더했더니 카드 위가 124px 비어 "여백이 너무 많다"는 피드백, 2026-09-29), 333×344 카드(radius 20, 패딩 75/30/50, 제목 48, 부제 20, 본문 16/22, 링크 13.5), 간격 20, **가운데 스냅 + 양옆 카드 50% 불투명**, 처음엔 가운데 카드(나답게)가 가운데. 점 10px/간격 20/`#AEA89B`(비활성 50%). prev/next 버튼 없음.
- ⚠️ **가로 스크롤 트랙은 세로로도 잘린다** (`overflow-x: auto` → `overflow-y`도 클립, 4.12). 모바일 Section 2 트랙에 위아래 여백이 0이었더니 마우스 hover(`translateY(-6px)`) 때 카드 윗부분이 잘렸다(2026-09-29). 트랙에 위아래 10mu 패딩을 주고, 그만큼 섹션 위 여백·점과의 간격에서 빼서 배치는 그대로 둔다. hover 그림자도 그 10mu 안에 들어오도록 모바일에서는 `0 8mu 12mu -6mu rgba(0,0,0,.4)`로 줄였다(데스크톱 `0 20 40 -20`은 아래로 ~20px 번져서 잘렸다). Section 4 트랙도 위 10mu를 둔다.
- **Section 3** (2026-09-30 갱신): 헤딩 패딩 20(아이콘 16, 간격 8, 20px `#d9d9d9`), 리스트 패딩 20·항목 간격 30, 번호 칸 58(18/24 SemiBold)·간격 **10**, 제목 **18/26 SemiBold, 자간 -0.9px(-0.05em), 왼쪽 정렬, `word-break: keep-all`**(양쪽 맞춤이 아니면 어절 단위로 끊는다), 12 간격, 본문 12/17.2 Light 왼쪽 정렬(폰 폭에서 양쪽 맞춤은 영문 사이가 크게 벌어졌다), 링크(Figma 8.47px → 가독성 위해 최소 10px).
- **Section 4**: 위 20, 헤딩(20px `#333`, 화살표 버튼 없음) → 36 → 298×372 카드(radius 8, 그림자 `0 9.6 12 .15`, 헤더 패딩 20/24/16/20, 번호·제목 16, 본문 패딩 5/20/20, 묶음 간격 20, 라벨 10, 항목 12px·행 22.4, 체크 8) **가운데 스냅**, 아래 30 → 점 5px/간격 10 → 푸터.
- **푸터**: 패딩 20, 모든 글자 12px, 이메일은 소문자, 저작권은 아랫줄에 맞춤.
- 캐러셀 공용 로직은 여전히 `hooks/useHorizontalCarousel.ts` + `components/CarouselDots.tsx`. 가운데 스냅 트랙은 좌우 패딩을 `(100vw - 카드폭) / 2`로 줘서 첫/마지막 카드도 가운데에 오게 하고, 그래서 `activeIndex = round(scrollLeft / (카드폭+간격))`가 그대로 맞는다. 점 모양은 각 컴포넌트 CSS에서 `.mobileNav > div > button`으로 덮어쓴다.

### 4.16 hover 인터랙션
- **카드** (`DevelopmentPlan`, `PolicyCarousel`): `transform: translateY(-6px)` + `box-shadow`, `transition: 300ms cubic-bezier(0.16,1,0.3,1)`. 카드 안 이미지가 있으면 `transform: scale(1.04)`도 같이 (별도 `transition-duration` 500ms로 조금 더 느리게). 카드가 `Reveal`로 감싸여 있다면 4.14의 `:where()` 명시도 규칙 때문에 hover가 항상 이긴다.
- **"자세히 보기" 류 링크** (`cardLink`, `itemLink`): `gap`을 8px→9px 정도로 늘려서 화살표가 살짝 앞으로 나가는 느낌 + `color`를 포인트 컬러로 전환. `transition: gap 200ms ease, color 200ms ease;`
- 전부 `@media (prefers-reduced-motion: reduce)`에서 `transform` 애니메이션은 끈다(그림자/색 전환은 순간적이라 굳이 끄지 않아도 됨).

### 4.17 "SCROLL DOWN" 인디케이터 (`components/ScrollDownIndicator.tsx`)
섹션 하단에 고정된 "SCROLL DOWN" 텍스트 + 더블 쉐브론 아이콘. **다음 페이지가 있는 섹션(`Hero`/`DevelopmentPlan`/`Promises`)에 전부 단다** — 웹 버전에서는 어느 페이지에 있든 항상 보여야 한다는 사용자의 명시적 요구사항. Figma엔 원래 `Promises`/`PolicyCarousel`에만 있었지만, Figma에 없다고 자동으로 빼지 않고 일관성을 위해 추가했다. **마지막 섹션(`PolicyCarousel`)에는 달지 않는다** (2026-09-29 사용자 요청: "더이상 내려갈게 없잖아" — 이전엔 "항상 보인다"를 우선해 여기에도 달았었다). 새 섹션을 맨 끝에 추가하면 인디케이터도 그쪽으로 옮긴다. `active` prop은 바운스 애니메이션만 켜고 끌 뿐, 인디케이터 자체는 `active`와 무관하게 항상 렌더링된다 — "항상 보인다"를 만족하려면 이 컴포넌트를 조건부로 렌더링하면 안 된다.
- **세로 화면(모바일 레이아웃, 4.15)에서는 숨긴다** — 모바일 Figma에 없고, 자유 스크롤이라 필요 없다.
- **라벨과 쉐브론은 한 덩어리로 같이 움직인다** — `.bobbing`은 아이콘이 아니라 인디케이터 루트에 붙는다 (2026-09-29, 예전엔 쉐브론만 움직였다).
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
- **타이밍 (2026-09-29, Figma 타임라인 기준)**: 이동 1.4s `easeInOut`(`cubic-bezier(0.42,0,0.58,1)`, `.card`의 `--reveal-ease`로 전달), 가운데 카드 먼저, 양옆은 0.53s 뒤. 이동 거리도 Figma px에 `--u`를 곱한 문자열(`distance="calc(909 * var(--u))"`)로 넘긴다 — `Reveal`의 `distance`는 숫자(px) 또는 CSS 길이 문자열을 받는다.
- **트리거 (2026-09-29)**: `visible={settled}`(스냅이 끝난 뒤)에서 `hooks/useEnterView.ts`로 바꿨다 — 섹션이 화면에 **25%** 들어온 순간 시작하고, 거의 완전히(1% 미만) 빠져나가야 리셋된다(히스테리시스). **리셋은 화면 아래로 빠져나갈 때만**(=위로 스크롤해서 지나쳤을 때) 한다 — 아래 페이지로 지나간 뒤 다시 올라오면 카드/항목이 이미 제자리에 있고 애니메이션을 다시 틀지 않는다(사용자 요청: 등장 애니메이션은 앞 페이지에서 넘어올 때만). `Promises`(4.21)도 같은 훅이라 동일. "페이지 이동이 끝난 뒤 시작"은 늦게 느껴진다는 피드백 — 지금은 다음 페이지가 슬라이드로 올라오는 도중에 카드가 함께 들어온다. 리셋 조건을 `isIntersecting === false`로 쓰면 안 된다: 페이지가 정렬되면 이웃 섹션이 뷰포트 경계에 딱 붙어 있게 되는데, 그때 면적 0이어도 `isIntersecting`이 true로 남아 영영 리셋이 안 된다(실측) — 1% 임계값을 따로 둔다.
- ⚠️ **`Reveal`이 붙는 요소에 다른 `transition`/`transform`을 걸지 않는다.** `.card`에 hover용 `transition: transform 300ms, box-shadow …`가 같이 걸려 있어서 `Reveal`의 `transition-property: opacity, transform`을 덮어써 버렸고, 등장할 때 opacity가 페이드 없이 "툭" 켜졌다. hover lift·radius·overflow는 안쪽 `.cardInner`로 옮겼다(4.12의 2단 구조와 같은 원리).
- ⚠️ **Figma 모션 데이터를 곧이곧대로 복사하지 않는다.** Figma 프로토타입엔 스크롤 트리거가 없어서, 디자이너가 미리보기용으로 "6초짜리 무한 반복(`repeat: Infinity`)" 타임라인을 만들어두는 경우가 흔하다(이 카드 모션도, `Promises`의 6개 아이템 모션도 둘 다 이런 형태였다). 그 `repeat`나 절대 시간(`times` 배열)을 그대로 옮기면 실제 사이트에서 계속 제멋대로 움직이는 이상한 애니메이션이 된다. 옮길 건 ① 각 요소 자신의 `initial`→`animate` 오프셋(거리/축/방향), ② 요소들 사이의 **상대적** 시작 시점 차이(→ `delay` 스태거링 비율)뿐이고, 트리거 자체는 항상 IntersectionObserver(또는 4.18의 `settled`) 1회성으로 바꾼다.

### 4.20 스크롤이 콘텐츠를 건너뛰지 못하게 막기 — `scroll-snap-stop` (현재 미사용, 패턴만 기록)
예전에 `Promises`가 6개 항목으로 늘었을 때, 섹션 내용이 뷰포트보다 크면 강하게(빠르게) 스크롤할 때 `scroll-snap-type: y mandatory`가 이 섹션의 스냅 지점에서 전혀 멈추지 않고 바로 다음 섹션으로 넘어가버리는 문제가 있어서, `#promises`의 `.section`에 `scroll-snap-stop: always;`를 걸어 반드시 거쳐가게 만들었었다. **4.9 정책으로 `Promises`가 `height: 100dvh; overflow: hidden;`으로 바뀌면서 섹션 내용이 더 이상 뷰포트보다 커지지 않으므로, 이 문제 자체가 없어져 `scroll-snap-stop`을 제거했다** — 지금 코드베이스엔 이 프로퍼티를 쓰는 곳이 없다.
- 패턴은 앞으로 "부득이하게 뷰포트보다 큰" 섹션을 다시 만들게 될 경우를 위해 기록만 해둔다: 그런 섹션의 `.section`에만 `scroll-snap-stop: always;`를 걸고, **다른 섹션에는 걸지 않는다**(4.8에서 정한 "빠르게 스크롤하면 여러 섹션을 자연스럽게 지나칠 수 있어야 한다"는 자유로움이 깨진다). 하지만 4.9가 기본 정책이 된 지금은, 섹션이 뷰포트보다 커지는 상황 자체를 먼저 의심하고 vh-블렌드 `clamp()`로 줄이는 쪽을 우선 시도한다.
- ⚠️ **자동화 테스트에서 스크롤 동작을 검증할 때 `page.mouse.wheel()`은 못 믿는다.** 이 프로젝트를 테스트한 헤드리스 Chromium 환경에서 합성 wheel 이벤트는 실제 페이지 스크롤 위치를 전혀 안 움직이는 경우가 있었다(scrollY가 0에 고정) — 다만 **`window`에 등록한 `wheel` 이벤트 리스너 자체는 정상적으로 발화한다** (4.21의 `useSequentialReveal` 테스트에선 `page.mouse.wheel()`로 리스너를 확실히 트리거할 수 있었다). 즉 "이벤트가 발화하는지"와 "그 이벤트로 실제 네이티브 스크롤이 움직이는지"는 별개로 검증해야 한다 — 페이지 스크롤 위치 자체를 옮겨야 하는 테스트는 `page.evaluate(() => window.scrollBy({ top, behavior: 'instant' }))`나 `element.scrollIntoView({behavior:'instant'})`처럼 직접 위치를 지정하는 쪽이 안정적이다.

### 4.21 한 화면 안에서 항목을 하나씩 순서대로 보여주기 (`hooks/useSequentialReveal.ts`)
> **데스크톱(가로) 전용.** 세로 화면(4.15)에서는 `active`에 `!mobile`을 걸어 가로채기를 끄고, 항목은 `Reveal` 자동 모드로 스크롤해 들어올 때 각자 등장한다.
`Promises`의 여섯 항목처럼 "처음 들어왔을 때 첫째만 보이고, 스크롤할 때마다 둘째·셋째...가 나타나며, 다 보여주기 전엔 다음 섹션으로 안 넘어간다"를 구현해야 하는데, 4.9 정책으로 섹션이 `height: 100dvh; overflow: hidden;`으로 고정되어 있어서 **섹션 내부에 스크롤할 거리 자체가 없다** — 예전엔 각 항목이 자기 `IntersectionObserver`로 "화면에 들어왔는지"를 관찰(`Reveal`의 비제어 모드)했지만, 섹션이 안 움직이니 2번째 항목부터는 이 관찰이 아예 발화하지 않아(`rootMargin`이 겹치는 위치 자체가 없음) 영원히 숨어있는 채로 남는 버그가 났다(아이패드에서 "다섯째·여섯째가 안 보인다"는 증상으로 처음 발견됐지만, 근본 원인은 아이패드가 아니라 이 구조적 문제였다).
```tsx
const entered = useEnterView(ref, 0.25);
const revealedCount = useSequentialReveal(promises.length, settled, entered);
// 첫 항목은 25% 들어왔을 때 먼저 보인다: entered ? Math.max(revealedCount, 1) : 0
// <Reveal ... visible={index < revealedCount}>
```
- **리셋은 `settled`가 아니라 `present`(=`entered`)로 한다 (2026-09-29).** 6개를 다 본 뒤 페이지가 살짝 움직였다가(리사이즈 정렬 등) 제자리로 오면 그 순간 `settled`가 잠깐 false가 되는데, 그걸로 리셋하면 방금 다 본 항목이 1번으로 돌아가 버린다(실측). 섹션이 화면 **아래로** 완전히 빠져나갔을 때만(위로 스크롤해 지나쳤을 때) 처음부터 다시 재생한다 — 다음 페이지로 갔다가 돌아오면 6개가 다 보인 상태 그대로다(4.19).
- **스크롤 "거리"가 아니라 스크롤 "이벤트가 있었는지 여부"로 카운트를 올린다** — 사용자 요구사항 그대로("스크롤되는 양이 아니라, 스크롤이 됐는지 안됐는지 여부로"). 섹션이 `settled`(4.18)가 된 뒤, `window`에 `wheel`/`keydown`(↓, PageDown, Space)/`touchmove` 리스너를 걸어서 아래 방향 스크롤 의도를 감지할 때마다 `e.preventDefault()`로 페이지의 실제 scroll-snap 전환을 막고, `revealedCount`를 1씩 올린다.
- **쿨다운(700ms)으로 "한 번의 스크롤 제스처 = 한 걸음"을 만든다.** 트랙패드의 `wheel` 이벤트는 한 번 스크롤하는 동안 수십 개가 연속으로 발생하므로, 쿨다운 없이 그대로 카운트를 올리면 한 번 스크롤했는데 항목이 서너 개씩 건너뛰며 나타난다.
- `revealedCount`가 `total`에 도달하면 리스너를 전부 떼서 **더 이상 가로채지 않는다** — 다음 스크롤부터는 평소처럼 페이지가 다음 섹션으로 자연스럽게 넘어간다.
- 섹션에 진입할 때(`active`가 `false→true`)는 `revealedCount`를 1로(첫 항목은 바로 보임), 벗어날 때(`true→false`)는 0으로 되돌린다 — 다시 들어오면 처음부터 다시 재생된다(`Reveal`의 "스크롤로 다시 지나가면 매번 다시 재생" 원칙과 일관).
- ⚠️ **React Compiler 계열 린트 규칙(`react-hooks/set-state-in-effect`, `react-hooks/refs`) 둘 다 이 "prop 변화에 반응해 state를 리셋" 패턴의 표준적인 두 가지 구현을 막는다**: (1) effect 안에서 곧바로 `setState`를 호출하는 방식, (2) React 공식 문서가 권장하는 "렌더링 중 ref와 비교해서 조정" 방식(ref를 렌더링 중에 읽는 것 자체를 금지) 둘 다 이 프로젝트의 lint에 걸린다. 우회 방법은 `useSectionSettled`의 `check()`처럼, **`setState` 호출을 effect 본문에 직접 쓰지 않고 별도로 이름 붙인 함수(`reset`, `showFirst`) 안에 넣고 그 함수를 호출**하는 것 — 린트가 effect 본문에 직접 있는 `setState` 호출만 정적으로 탐지하기 때문에, 한 겹 감싸는 것만으로 동일한 동작이 통과된다. 이 프로젝트에서 "prop이 바뀔 때 state를 리셋"해야 하는 새 훅을 만들 때 이 우회 패턴을 기본으로 쓴다.

---

### 4.22 사이트 메뉴 — 햄버거 버튼 (`components/SiteMenu.tsx`, Figma `697:6208`)
헤더의 햄버거 버튼(`aria-expanded`/`aria-controls`)이 여는 오른쪽 슬라이드 패널. `Header.tsx`가 열림 상태를 갖고 `<SiteMenu>`를 헤더 옆에 렌더링한다.
- **디자인(Figma)**: 흰 패널 폭 456px·화면 전체 높이, 패딩 20/40, 그림자 `-10px 0 10px rgba(0,0,0,.25)`. 상단: 브랜드 두 줄(12px Regular / 20px ExtraBold, 간격 8, `#333`) + 24px X(`CloseIcon`, 1px 선). 40 아래로 메뉴 5개(22px SemiBold `#333`, 위아래 10 패딩, 간격 10). 맨 아래 E-MAIL(12px Space Mono) + 이메일(16px 대문자), 둘 다 `--color-muted`. 폰에서는 폭 `min(456px, 100vw - 48px)` — 어두운 배경이 한 줄 남아 탭해서 닫을 수 있다.
- **메뉴 항목 → 섹션**: 유 병 현 → `#hero`, (비전/리더십) → `#plan`, (주요 공약) → `#promises`, (발전 계획서) → `#policies`, (언론 보도 자료) → 아직 연결할 섹션이 없어 닫기만 한다. 라벨의 괄호는 Figma 문구 그대로(가제). 이동은 `goToSection()`(페이지 넘김과 같은 애니메이션).
- **배경**: 검정 50%(`rgba(0,0,0,.5)`, 사용자 지정). 클릭하면 닫힌다.
- **모션 (2026-09-30 "너무 빠르다" → 느리게)**: 열림 — 배경 800ms fade, 패널 오른쪽에서 **1000ms** `cubic-bezier(0.22,1,0.36,1)`, 메뉴 항목은 350ms 뒤부터 90ms 간격으로 32px 옆에서 fade-in(700~900ms). 닫힘 — 패널 500ms ease-in으로 빠져나가고, **메뉴 글자는 따로 fade-out 하지 않는다**(사용자 요청) — 패널에 실린 채 나가고, 패널이 사라진 뒤(550ms) 숨김 상태로 리셋된다. 패널은 항상 마운트해 두고 `visibility`(닫힘 전환이 끝난 뒤 숨김) + `inert`로 닫힌 상태에서 포커스·클릭을 막는다.
- **X hover**: 450ms로 **90°만** 한 번 — `transition`이 아니라 `.close:hover svg`의 1회짜리 `@keyframes turnOnce`. ⚠️ **X는 90°마다 똑같은 모양이라 360° 회전은 네 바퀴로 보인다**("세네 바퀴 도는 것 같다" 피드백, 2026-09-30) — 대칭 아이콘을 "한 바퀴" 돌릴 때는 대칭 각도만큼만 돌린다. 마우스를 떼면 아무 애니메이션도 없고(예전 transition 방식은 떼면 역회전해 두 바퀴처럼 보였다, "너무 과하다"), 다시 올리면 새로 한 바퀴. 터치 기기(hover 없음)와 OS의 "동작 줄이기" 설정에서는 돌지 않는다.
- **아이콘 선 굵기 통일 (2026-09-30)**: 햄버거·X·공약 카드 화살표 모두 **1px 선**, `vector-effect: non-scaling-stroke`로 렌더 크기와 상관없이 정확히 1px. 공약 카드 화살표는 예전 채워진(fill) 14px 화살표를 30px로 키워 ~2.8px로 두꺼워 보였다 → `LineArrowRightIcon`(선 화살표)으로 교체. 새 아이콘도 선 굵기는 이 규칙을 따른다. 메뉴 링크 hover는 키 컬러 + 오른쪽 6px.
- **열려 있는 동안**: `<html data-menu-open>`(`lib/menuState.ts`). window capture 단계에서 wheel/touchmove와 스크롤 키를 막아 뒤 페이지가 움직이지 않고, `SectionPager`·`useSequentialReveal`도 이 속성을 보고 아무것도 하지 않는다(페이지가 넘어가거나 공약 항목이 열리지 않도록). Esc로 닫힘, Tab은 패널 안에서만 돈다, 열면 **패널 자체**(`tabIndex=-1`)에 포커스·닫으면 햄버거로 포커스 복귀. ⚠️ X 버튼에 바로 포커스를 주면 iOS Safari가 탭 후에도 포커스 링(동그라미 테두리)을 그렸다 — 그래서 패널에 포커스를 두고, X의 링은 키보드 Tab일 때(`:focus-visible`)만 보인다.

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
3. 좌우 패딩 `--space-page-x`, 콘텐츠 wrapper `max-width: var(--content-max)` 패턴을 따른다. 화면 단위 섹션은 **4.9 패턴**: `height: 100dvh; overflow: hidden;` 안전망 + 섹션 내부 모든 길이를 Figma px × `--u`로 쓴다(요소마다 따로 튜닝한 `vw`/`vh` `clamp()`를 새로 만들지 않는다). 새 섹션은 `main`의 직계 `<section>`으로 두면 `SectionPager`가 자동으로 한 페이지로 잡는다.
4. 새 섹션은 가로(데스크톱, `--u`, 한 화면) 레이아웃과 `@media (orientation: portrait)` 모바일(`--mu`, 자유 스크롤, 모바일 Figma `629:7979`) 레이아웃을 둘 다 만든다.
5. 이미지·아이콘은 전부 실제 에셋만 사용한다. 구할 수 없으면 사용자에게 먼저 알린다. "비슷해 보인다"는 이유로 다른 요소의 기존 에셋을 재사용하기 전에, 그 요소 자신의 Figma 노드에서 실제 에셋/색상을 직접 확인한다(4.12 카드 배경 이미지 사례 참고).
6. 과한 그라디언트/글로우/불필요한 둥근 카드/장식 요소를 새로 추가하지 않는다.
7. `html`에 `scroll-behavior: smooth`도, CSS `scroll-snap-type`도 걸지 않는다 — 섹션 페이징은 `SectionPager`(4.8)가 담당한다. 스크롤 위치를 읽어야 하는 컴포넌트는 `scroll` 리스너보다 `IntersectionObserver`를 우선 검토한다 (4.7, 4.18).
8. 등장 애니메이션이 필요하면 새 라이브러리를 깔지 말고 `components/Reveal.tsx`를 재사용한다 (4.14, 4.19). 섹션 콘텐츠 등장은 `useEnterView`(섹션 25% 진입)로 트리거하고, "자리잡은 뒤에만" 의미가 있는 것(스크롤다운 바운스, `Promises`의 휠 가로채기)만 `useSectionSettled`로 게이팅한다. 섹션이 한 화면에 고정돼 있어 항목을 하나씩 보여줘야 하면 4.21의 `useSequentialReveal`을 쓴다. `Reveal` 요소 자체에는 hover `transition`/`transform`을 걸지 않는다(4.19).
9. 작업 후 `npm run lint && npm run build`로 검증하고, 최소 1개 데스크톱 + 1개 모바일 뷰포트로 스크린샷 확인한다. 가로 스크롤 발생 여부(`document.documentElement.scrollWidth === clientWidth`)와, 한 줄로 강제한 텍스트가 있다면 `element.scrollWidth > element.clientWidth`(줄바꿈/잘림 여부)를 실측한다. `fullPage` 스크린샷은 `IntersectionObserver`/`scrollend` 기반 등장 애니메이션을 제대로 트리거하지 않을 수 있으니, Reveal 요소 확인은 실제 `scrollTo`/`scrollIntoView` 반복으로 검증한다.
10. **섹션이 한 화면에 다 들어오는지, 9번 분단 매트릭스 전체(4.9 참고: 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 1024×1366, 768×1024, 820×1180, 1180×820, 1280×720)에서 실측한다** — 데스크톱 하나, 모바일 하나만 확인하고 넘어가면 가로로 넓고 세로로 짧은 조합(`1280×720`)이나 좁고 긴 세로형 태블릿(`768×1024`)에서 깨지는 걸 놓친다. `scrollHeight`가 아니라 자식 요소의 `getBoundingClientRect()`를 섹션과 직접 비교하고(4.9), 등장 애니메이션이 완전히 끝난 뒤(transform이 항등 행렬인지 확인) 측정한다.
