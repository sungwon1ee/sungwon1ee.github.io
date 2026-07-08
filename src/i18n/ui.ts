import type { Localized } from "./types";

/** Static UI strings (chrome, labels). Content lives in data/*. */
export const ui = {
  nav_projects: { ko: "프로젝트", en: "Projects" },
  nav_cv: { ko: "이력", en: "CV" },
  nav_research: { ko: "연구", en: "Research" },
  nav_contact: { ko: "연락", en: "Contact" },

  hero_cta_projects: { ko: "프로젝트 보기", en: "View projects" },
  hero_cta_contact: { ko: "연락하기", en: "Get in touch" },
  hero_pillars_eyebrow: { ko: "관심 분야", en: "Areas of Interest" },

  projects_eyebrow: { ko: "작업", en: "Work" },
  projects_title: { ko: "프로젝트", en: "Projects" },

  cv_eyebrow: { ko: "이력", en: "Curriculum Vitae" },
  cv_title: { ko: "CV", en: "CV" },
  cv_education: { ko: "학력", en: "Education" },
  cv_experience: { ko: "경력", en: "Experience" },
  cv_awards: { ko: "수상 · 수료", en: "Awards & Certificates" },
  cv_skills: { ko: "역량", en: "Skills" },

  research_eyebrow: { ko: "탐구", en: "Exploration" },
  research_title: { ko: "개인 연구", en: "Research" },

  detail_back: { ko: "돌아가기", en: "Back" },
  detail_overview: { ko: "개요", en: "Overview" },
  detail_gallery: { ko: "갤러리", en: "Gallery" },
  detail_demos: { ko: "데모", en: "Demos" },
  detail_links: { ko: "링크", en: "Links" },
  detail_role: { ko: "역할", en: "Role" },
  detail_year: { ko: "연도", en: "Year" },
  detail_status: { ko: "상태", en: "Status" },
  detail_not_found: { ko: "프로젝트를 찾을 수 없어요.", en: "Project not found." },

  kind_app: { ko: "앱", en: "App" },
  kind_channel: { ko: "채널", en: "Channel" },
  kind_web: { ko: "웹", en: "Web" },
  kind_research: { ko: "연구", en: "Research" },
} satisfies Record<string, Localized>;

export type UIKey = keyof typeof ui;
