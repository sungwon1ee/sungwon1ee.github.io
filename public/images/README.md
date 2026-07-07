# 이미지 넣는 곳 / Where images go

이 폴더에 실제 사진을 넣으면 코드 수정 없이 자동으로 표시됩니다.
Drop real photos here and they show up automatically — no code changes needed.

## 파일 이름 규칙 / File names

데이터 파일에서 참조하는 경로와 파일명을 맞춰주세요.
Match the paths referenced in the data files:

| 용도 / Use          | 경로 / Path                          | 참조 위치 / Referenced in |
| ------------------- | ------------------------------------ | ------------------------- |
| 프로필 사진 / Avatar | `/images/avatar.jpg`                 | `src/data/profile.ts`     |
| pokoPet 커버        | `/images/pokopet-cover.jpg`          | `src/data/projects.ts`    |
| pinchNubzuki 커버   | `/images/pinchnubzuki-cover.jpg`     | `src/data/projects.ts`    |
| 말랑랩 커버 / Malang | `/images/malanglab-cover.jpg`        | `src/data/projects.ts`    |

- 사진이 아직 없어도 됩니다 — 없으면 프로젝트의 accent 색으로 된 그라디언트 플레이스홀더가 자동으로 그려집니다.
  Photos are optional — a gradient placeholder (using each project's accent color) is drawn when a file is missing.
- 권장 비율 / Recommended ratio: 커버 4:3, 아바타 1:1.
- 갤러리 이미지는 `src/data/projects.ts`의 각 프로젝트 `gallery: []` 배열에 경로를 추가하세요.
  For gallery images, add paths to each project's `gallery: []` array in `src/data/projects.ts`.
