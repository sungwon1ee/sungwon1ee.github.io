import type { Localized } from "../i18n/types";

export type ProjectKind = "app" | "channel" | "web" | "research";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  /** URL slug + React key. Must be unique. */
  id: string;
  /** Display name (usually kept in one script). */
  title: string;
  kind: ProjectKind;
  /** One line shown on the card. */
  tagline: Localized;
  /** Full body shown on the detail page. */
  description: Localized;
  year: string;
  /** e.g. "운영 중" for the Instagram channel. Optional. */
  status?: Localized;
  role?: Localized;
  tags: string[];
  /** Cover image under /public, e.g. "/images/pokopet-cover.jpg".
   *  Leave as "" to render a generated gradient placeholder. */
  cover: string;
  /** Optional accent color used for the placeholder + detail hero glow. */
  accent?: string;
  gallery?: string[];
  links?: ProjectLink[];
  /** Poster image + clip pairs for RL/demo footage, shown as a dedicated section. */
  demos?: DemoItem[];
  /** Video under /public that plays directly in the cover slot (autoplay, muted, looped) instead of a static image. */
  coverVideo?: string;
};

export type DemoItem = {
  /** Poster frame shown before the clip is played. */
  image: string;
  /** Video file under /public, e.g. "/videos/malanglab-demo-running.mov". */
  video: string;
  caption?: Localized;
};

/* -------------------------------------------------------------------------
   Add a new project = append one object here + drop its image in /public/images.
   Everything (grid card, detail route /projects/<id>) updates automatically.
   ------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: "pokopet",
    title: "pokoPet",
    kind: "app",
    tagline: {
      ko: "화면 위를 돌아다니는 3D 데스크톱 친구.",
      en: "A 3D desktop buddy that lives on your screen.",
    },
    description: {
      ko: "pokoPet은 데스크톱 위에 살아 움직이는 3D 캐릭터 앱입니다. 수달과 도마뱀 같은 친구들이 창 위를 걸어다니고, 작은 말풍선으로 반응하며 일상에 소소한 생명감을 더해요. 사람과 화면 사이의 자연스러운 상호작용을 실험한 프로젝트로, 3D 캐릭터·애니메이션·앱 개발을 직접 진행했습니다.",
      en: "pokoPet is an app of expressive 3D characters that live on your desktop. Friends like an otter and a gecko wander across your windows and react with little speech bubbles, adding a small sense of life to your day. It's an experiment in natural interaction between people and their screens — I built the 3D characters, animation, and the app itself.",
    },
    year: "2026",
    status: { ko: "진행 중", en: "Ongoing" },
    role: { ko: "기획 · 3D · 개발", en: "Concept · 3D · Development" },
    tags: ["Desktop", "3D", "Character"],
    cover: "/images/pokopet-cover.png",
    accent: "#3d8fd6",
    gallery: ["/images/pokopet-cover.png", "/images/pokopet-2.png", "/images/pokopet-3.png"],
    links: [
      { label: "Support", url: "https://sungwon1ee.github.io/pokopet-support/" },
    ],
  },
  {
    id: "malanglab",
    title: "말랑랩 (MalangLab)",
    kind: "research",
    tagline: {
      ko: "강화학습으로 캐릭터 '넙죽이'에게 움직임을 학습시키는 프로젝트.",
      en: "A project training a character named Nubzuki to move using reinforcement learning.",
    },
    description: {
      ko: "말랑랩은 강화학습으로 캐릭터 '넙죽이'에게 달리기·축구·외줄타기·스노보드 같은 다양한 물리 동작을 학습시키는 프로젝트입니다. 각 동작마다 별도의 정책을 학습시키고, 그 과정과 결과를 영상으로 기록합니다. 진행 과정은 인스타그램(@말랑랩)에 공유하고 있습니다.",
      en: "MalangLab trains a character named Nubzuki to perform physical skills — running, soccer, tightrope walking, snowboarding — using reinforcement learning. Each skill is trained as a separate policy, and I record the process and results on video. Progress is shared on Instagram (@MalangLab).",
    },
    year: "2025",
    status: { ko: "진행 중", en: "Ongoing" },
    role: { ko: "강화학습 실험 · 모션 컨트롤", en: "RL Experiments · Motion Control" },
    tags: ["Reinforcement Learning", "Robotics", "Physics Simulation"],
    cover: "/images/malanglab-running.png",
    accent: "#ff5c94",
    gallery: [],
    demos: [
      {
        image: "/images/malanglab-running.png",
        video: "/videos/malanglab-demo-running.mov",
        caption: { ko: "달리기", en: "Running" },
      },
      {
        image: "/images/malanglab-soccer.png",
        video: "/videos/malanglab-demo-goal.mov",
        caption: { ko: "축구", en: "Soccer" },
      },
      {
        image: "/images/malanglab-rope.png",
        video: "/videos/malanglab-demo-rope.mov",
        caption: { ko: "외줄타기", en: "Tightrope" },
      },
      {
        image: "/images/malanglab-snowboard.png",
        video: "/videos/malanglab-demo-snowboard.mov",
        caption: { ko: "스노보드", en: "Snowboard" },
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sungwon1ee/Malang-Lab" },
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Email", url: "mailto:malang.laboratory@gmail.com" },
    ],
  },
  {
    id: "pinchnubzuki",
    title: "pinchNubzuki",
    kind: "web",
    tagline: {
      ko: "웹캠 손 인식으로 캐릭터를 꼬집어 움직이는 인터랙션 실험.",
      en: "A browser experiment where you pinch a character via webcam hand tracking.",
    },
    description: {
      ko: "pinchNubzuki는 웹캠으로 손을 인식해 화면 속 캐릭터를 실제로 꼬집고 움직이는 브라우저 기반 인터랙션 실험입니다. 한 손으로 꼬집으면 이동, 두 손으로 꼬집으면 회전·크기 조절이 되도록 만들었고, 꼬집기 인식 민감도·회전 속도·탄성 같은 물리 파라미터를 화면에서 바로 조절할 수 있습니다.",
      en: "pinchNubzuki is a browser-based interaction experiment that tracks your hands through the webcam, letting you pinch and move an on-screen character with your real hands. Pinching with one hand moves it; pinching with both hands rotates and resizes it. Physical parameters like pinch sensitivity, rotation speed, and bounciness are all tunable live.",
    },
    year: "2025",
    role: { ko: "기획 · 디자인 · 개발", en: "Concept · Design · Development" },
    tags: ["Web", "Hand Tracking", "Interaction"],
    cover: "/images/pinchNubzuki.png",
    coverVideo: "/videos/pinchNubzuki-demo.mov",
    accent: "#5e5ce6",
    gallery: [],
    links: [{ label: "GitHub", url: "https://github.com/sungwon1ee/pinchNubzuki" }],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
