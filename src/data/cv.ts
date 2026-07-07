import type { Localized } from "../i18n/types";

export type TimelineItem = {
  period: string;
  title: Localized;
  org: Localized;
  detail?: Localized;
};

export type SkillGroup = {
  label: Localized;
  /** Plain strings render as-is (e.g. proper nouns); Localized entries translate with the page. */
  items: (string | Localized)[];
};

export const education: TimelineItem[] = [
  {
    period: "2026.09 — 2027.02",
    title: { ko: "교환학생", en: "Exchange Student" },
    org: { ko: "🇯🇵 Institute of Science Tokyo", en: "🇯🇵 Institute of Science Tokyo" },
  },
  {
    period: "2021 — ",
    title: { ko: "학사 과정, 전산학부 (SoC)", en: "B.S. in Computer Science" },
    org: { ko: "🇰🇷 KAIST", en: "🇰🇷 KAIST" },
  },
];

export const experience: TimelineItem[] = [
  {
    period: "2026.01 — 2026.03",
    title: { ko: "인턴십", en: "Internship" },
    org: {
      ko: "KAIST Scalable Graphics, Vision, Robotics Lab",
      en: "KAIST Scalable Graphics, Vision, Robotics Lab",
    },
  },
  {
    period: "2025.06 — 2025.12",
    title: { ko: "인턴십", en: "Internship" },
    org: { ko: "KAIST Music and Computing Lab", en: "KAIST Music and Computing Lab" },
  },
  {
    period: "2023.04 — 2025.01",
    title: { ko: "AI/데이터 개발팀", en: "AI / Data Development Team" },
    org: { ko: "공군 지능정보체계관리단", en: "ROK Air Force, Intelligence Information Systems Management Group" },
    detail: {
      ko: "국방망 기반 생성형 AI 플랫폼 'AiRWARDS' 개발에 참여",
      en: "Contributed to 'AiRWARDS,' a generative AI platform for the military intranet",
    },
  },
];

export const awards: TimelineItem[] = [
  {
    period: "2026 Spring",
    title: { ko: "Manipulation Challenge 1위", en: "1st Place, Manipulation Challenge" },
    org: {
      ko: "Introduction to Intelligent Robotics (CS477)",
      en: "Introduction to Intelligent Robotics (CS477)",
    },
  },
  {
    period: "2026.01 — 2026.03",
    title: { ko: "LG Aimers 수료", en: "LG Aimers (Completion)" },
    org: { ko: "LG AI Research", en: "LG AI Research" },
  },
];

export const skills: SkillGroup[] = [
  {
    label: { ko: "로보틱스", en: "Robotics" },
    items: ["ROS2", "Gazebo"],
  },
  {
    label: { ko: "강화학습", en: "Reinforcement Learning" },
    items: ["Unity ML-Agents"],
  },
  {
    label: { ko: "그래픽스", en: "Graphics" },
    items: ["Unity (C#)", "Blender", "Fusion 360"],
  },
  {
    label: { ko: "프론트엔드", en: "Frontend" },
    items: ["TypeScript", "React", "Vue"],
  },
  {
    label: { ko: "백엔드", en: "Backend" },
    items: ["NestJS", "Spring Boot"],
  },
  {
    label: { ko: "사용해본 언어", en: "Also Used" },
    items: ["Python", "C++", "Rust", "Scala"],
  },
  {
    label: { ko: "구사 언어", en: "Languages" },
    items: [
      { ko: "한국어 (원어민)", en: "Korean (Native)" },
      { ko: "영어 (비즈니스)", en: "English (Business)" },
      { ko: "일본어 (N2)", en: "Japanese (N2)" },
    ],
  },
];
