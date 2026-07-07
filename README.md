# Sungwon Lee — Personal Site

개인 소개 · 포트폴리오 · CV · 개인 연구를 한곳에 모은 사이트.
Motto: **Human Interaction** — pursued through **RL · Robotics · Graphics**.

Apple-style glass 디자인 / 한·영 토글 / 라이트·다크 자동 대응.

## 실행 / Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입체크 + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 콘텐츠 수정 = 데이터 파일만 편집

모든 콘텐츠는 `src/data/`에 있습니다. 컴포넌트는 건드릴 필요 없어요.

| 파일                   | 내용                                        |
| ---------------------- | ------------------------------------------- |
| `src/data/profile.ts`  | 이름, 모토(Human Interaction), 3 pillars, 소개, 소셜 |
| `src/data/projects.ts` | 프로젝트 목록 (pokoPet · pinchNubzuki · 말랑랩) |
| `src/data/cv.ts`       | 학력 · 경력 · 역량                           |
| `src/data/research.ts` | 개인 연구 항목                               |

### 프로젝트 추가하기

1. `src/data/projects.ts`의 `projects` 배열에 객체 하나를 추가
2. 커버 이미지를 `public/images/`에 넣고 `cover` 경로를 맞춤
   (이미지가 없으면 accent 색 그라디언트 플레이스홀더가 자동 표시)

그러면 홈 그리드 카드와 `/projects/<id>` 상세 페이지가 자동으로 생깁니다.
자세한 이미지 규칙은 `public/images/README.md` 참고.

## 구조

- `src/styles/tokens.css` — 디자인 토큰(색·간격·반경·글래스). 여기서 룩앤필을 조정.
- `src/components/` — GlassCard, Navbar, Section, ProjectCard, CoverImage, Footer
- `src/sections/` — Hero, Projects, CV, Research, Contact
- `src/pages/` — Home, ProjectDetail
- `src/i18n/` — 한·영 토글 (LocaleContext), UI 문자열 사전(ui.ts)
