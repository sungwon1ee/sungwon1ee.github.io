import type { Localized } from "../i18n/types";

export type ResearchItem = {
  id: string;
  title: Localized;
  summary: Localized;
  period: string;
  tags: string[];
  link?: string;
};

/* Add a research note = append one object here. Left empty for now. */
export const research: ResearchItem[] = [];
