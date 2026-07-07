import type { Localized } from "../i18n/types";

export type SocialLink = {
  label: string;
  url: string;
};

/** A pillar — one of the methods behind the work. */
export type Pillar = {
  label: string;
};

export type Profile = {
  name: Localized;
  /** Short role/headline under the name. */
  headline: Localized;
  /** The methods behind the work (robotics, RL, graphics …). */
  pillars: Pillar[];
  /** 1–3 sentence intro shown in the hero. */
  intro: Localized;
  /** Path under /public, e.g. "/images/avatar.jpg". */
  avatar: string;
  location: Localized;
  email: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: { ko: "이성원", en: "Sungwon Lee" },
  headline: {
    ko: "KAIST 전산학부 (SoC) · 21학번",
    en: "KAIST School of Computing · Bachelor's",
  },
  pillars: [{ label: "Robotics" }, { label: "Reinforcement Learning" }, { label: "Graphics" }],
  intro: {
    ko: "살아있는 존재로 느껴지는 것을 만들고자 합니다.\n아이디어를 실제로 손에 잡히는 것으로 바꾸는 과정을 좋아합니다.",
    en: "I build things that feel alive.\nI love turning ideas into things you can actually hold.",
  },
  avatar: "/images/avatar.jpg",
  location: { ko: "대한민국, 대전", en: "Daejeon, South Korea" },
  email: "sung1lee@kaist.ac.kr",
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
  ],
};
