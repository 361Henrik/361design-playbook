import { describe, expect, it } from "vitest";
import hostatlas from "../../design-system/hostatlas.contract.json";
import clientDelivery from "../../design-system/client-delivery.contract.json";

describe("design package contracts", () => {
  it("keeps Helmut and Olga tokens isolated", () => {
    expect(hostatlas.surfaces.helmut.tokens).not.toHaveProperty("terracotta");
    expect(hostatlas.surfaces.olga.tokens).not.toHaveProperty("antiqueBronze");
    expect(hostatlas.surfaces.helmut.minimumTargetPx).toBe(48);
    expect(hostatlas.surfaces.olga.minimumTargetPx).toBe(44);
  });

  it("blocks guessed marketing styling", () => {
    expect(hostatlas.surfaces.marketing.designSystem).toBe("required project import");
    expect(hostatlas.surfaces.marketing.forbidden).toContain("guessed-palette");
  });

  it("keeps client delivery approval-gated", () => {
    expect(clientDelivery.prohibitions).toContain("automatic-send");
    expect(clientDelivery.principles).toContain("evidence-before-claims");
  });
});
