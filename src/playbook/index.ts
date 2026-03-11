/* ------------------------------------------------------------------ */
/*  Playbook Registry — central index of all playbook pages            */
/* ------------------------------------------------------------------ */

import type { PlaybookPage } from "./types";
import { playbookMeta } from "./_meta";

// Principles
import { brandPrinciples } from "./principles";

// Tokens
import { colorsPlaybook } from "./tokens/colors";
import { typographyPlaybook } from "./tokens/typography";
import { spacingPlaybook } from "./tokens/spacing";
import { layoutPlaybook } from "./tokens/layout";
import { motionPlaybook } from "./tokens/motion";
import { iconsPlaybook } from "./tokens/icons";
import { voicePlaybook } from "./tokens/voice";

// Components
import { buttonsPlaybook } from "./components/buttons";
import { cardsPlaybook } from "./components/cards";
import { formsPlaybook } from "./components/forms";
import { dataDisplayPlaybook } from "./components/data-display";
import { layoutComponentsPlaybook } from "./components/layout";
import { navigationPlaybook } from "./components/navigation";

// Patterns
import { narrativePatterns } from "./patterns/narrative-patterns";

// Channel Kits
import { channelKitsPlaybook } from "./channels/channel-kits";

// Maps
import { mapPrinciplesPlaybook } from "./maps/principles";
import { corridorPlaybook } from "./maps/corridor";
import { layersPlaybook } from "./maps/layers";
import { visualStylePlaybook } from "./maps/visual-style";
import { labelsPlaybook } from "./maps/labels";
import { routePositionPlaybook } from "./maps/route-position";
import { interactionPlaybook } from "./maps/interaction";
import { filteringPlaybook } from "./maps/filtering";
import { guestExperiencePlaybook } from "./maps/guest-experience";
import { mapExamplesPlaybook } from "./maps/examples";

// Guardrails
import { guardrailsPlaybook } from "./guardrails/rules";

export { playbookMeta };

/** All playbook pages in export order */
export const allPlaybookPages: PlaybookPage[] = [
  // 01 — Principles
  brandPrinciples,

  // 02 — Tokens
  colorsPlaybook,
  typographyPlaybook,
  spacingPlaybook,
  layoutPlaybook,
  motionPlaybook,
  iconsPlaybook,
  voicePlaybook,

  // 03 — Components
  buttonsPlaybook,
  cardsPlaybook,
  formsPlaybook,
  dataDisplayPlaybook,
  layoutComponentsPlaybook,
  navigationPlaybook,

  // 04 — Patterns
  narrativePatterns,

  // 04b — Channel Kits
  channelKitsPlaybook,

  // 05 — Maps
  mapPrinciplesPlaybook,
  corridorPlaybook,
  layersPlaybook,
  visualStylePlaybook,
  labelsPlaybook,
  routePositionPlaybook,
  interactionPlaybook,
  filteringPlaybook,
  guestExperiencePlaybook,
  mapExamplesPlaybook,

  // 06 — Guardrails
  guardrailsPlaybook,
];

/** Get pages grouped by section */
export function getPlaybookSections() {
  const sections: Record<string, PlaybookPage[]> = {};
  for (const page of allPlaybookPages) {
    if (!sections[page.section]) sections[page.section] = [];
    sections[page.section].push(page);
  }
  return sections;
}

/** Completeness audit */
export function getPlaybookAudit() {
  const total = allPlaybookPages.length;
  const complete = allPlaybookPages.filter((p) => p.status === "complete").length;
  const draft = allPlaybookPages.filter((p) => p.status === "draft").length;
  const incomplete = allPlaybookPages.filter((p) => p.status === "incomplete").length;
  const openQuestions = allPlaybookPages.flatMap((p) =>
    p.openQuestions.map((q) => ({ page: p.page, section: p.section, question: q }))
  );

  return { total, complete, draft, incomplete, openQuestions };
}
