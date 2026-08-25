# Client Delivery

> Human-readable companion to `design-system/client-delivery.contract.json` for proposals, workshops, reports, review briefs, and handoffs.

## 1. Purpose

Make the client decision easy to understand, verify, and approve.

- Lead with conclusion and next action.
- Use plain language and direct source labels.
- Keep detail progressively disclosed.
- Require human approval before external send or publication.
- Use evidence before claims.

## 2. Required inputs

Before design begins, identify audience, purpose, decision, source material, delivery format, and the selected design system. If any input would materially change the artifact and is missing, return `BLOCKED`.

Client Delivery does not inherit HostAtlas tokens by default. A HostAtlas or client design system applies only when the brief names its exact reference.

## 3. Visual system

- Calm hierarchy and one message per section.
- Playfair Display + Lexend may be used for 361-owned work; client work uses the selected client design system.
- Mechanical 361 glyphs are available for 361-owned workflow diagrams. Do not place them inside HostAtlas product UI or a client brand without approval.
- Use meaningful imagery only when it carries evidence, context, or emotional purpose.
- No decorative gradients, generic AI graphics, stock-corporate scenes, or invented client branding.

## 4. Core artifact patterns

- **Proposal:** decision → problem → approach → proof → commercial terms → next action.
- **Workshop:** outcome → agenda → working canvas → decisions → owners → follow-up.
- **Report:** conclusion → evidence → implications → recommendation → appendix.
- **Review brief:** verdict → proof by criterion → corrections → unresolved warnings.
- **Handoff:** scope → exact revision → owner → verification → rollback or recovery.

## 5. Evidence and privacy

- Name the source beside the claim it supports.
- Distinguish inspected, proposed, approved, and delivered work.
- Never include credentials, private comments, client-confidential content outside scope, or expiring asset URLs.
- Never fabricate a quote, metric, case study, or approval.

## 6. Approval and handoff

Allowed verdicts: `BLOCKED`, `NOT_APPROVED`, `CLEAN`.

Handoff includes client, artifact, exact revision, owner, approval status, source links, and open warnings. “CLEAN” means the artifact is review-ready, not automatically sent.

*Version 1.0.0 · Reconciled 2026-08-11*
