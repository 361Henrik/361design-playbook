import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const hostatlas = JSON.parse(read("design-system/hostatlas.contract.json"));
const delivery = JSON.parse(read("design-system/client-delivery.contract.json"));

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(hostatlas.name === "HostAtlas Design Playbook", "HostAtlas package name changed");
expect(hostatlas.surfaces.helmut.designSystem === "ATLAS · Helmut", "Helmut theme identifier changed");
expect(hostatlas.surfaces.olga.designSystem === "ATLAS · Olga", "Olga theme identifier changed");
expect(hostatlas.surfaces.helmut.tokens.antiqueBronze === "#C69B5B", "Helmut bronze changed");
expect(hostatlas.surfaces.olga.tokens.champagneBronze === "#C9A962", "Olga bronze changed");
expect(hostatlas.surfaces.helmut.minimumTargetPx === 48, "Helmut target must be 48px");
expect(hostatlas.surfaces.olga.minimumTargetPx === 44, "Olga target must be 44px");
expect(!("terracotta" in hostatlas.surfaces.helmut.tokens), "Terracotta leaked into Helmut tokens");
expect(!("antiqueBronze" in hostatlas.surfaces.olga.tokens), "Helmut bronze leaked into Olga tokens");
expect(hostatlas.surfaces.marketing.designSystem === "required project import", "Marketing must require a project theme");
expect(delivery.name === "Client Delivery", "Client Delivery package name changed");
expect(delivery.prohibitions.includes("automatic-send"), "Client Delivery must retain human send approval");

const governedFiles = [
  "host-atlas-design-system.md",
  "src/data/guardrailRules.ts",
  "src/data/markdownExport.ts",
  "src/playbook/components/data-display.ts",
  "src/playbook/components/forms.ts",
  "src/playbook/components/navigation.ts",
  "src/playbook/maps/interaction.ts",
  "src/playbook/maps/visual-style.ts",
  "src/playbook/principles/image-system.ts",
  "src/playbook/principles/operator-branding.ts",
  "src/playbook/tokens/colors.ts",
  "src/playbook/tokens/icons.ts"
];
const governedText = governedFiles.map(read).join("\n");

for (const [pattern, message] of [
  [/\bInter\b/, "Inter remains as prescribed product typography"],
  [/#C6A96B/i, "Legacy bronze #C6A96B remains"],
  [/#C49A5C/i, "Legacy bronze #C49A5C remains"],
  [/#D4E4ED/i, "Legacy blue map water remains"],
  [/soft blue/i, "Blue map guidance remains"],
  [/gradient overlays? (?:are|is) permitted/i, "Gradient overlay permission remains"],
  [/operator may supply a display font/i, "Operator font override remains"]
]) {
  expect(!pattern.test(governedText), message);
}

if (failures.length) {
  console.error(`Design contract validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Design contracts CLEAN: HostAtlas surfaces are isolated and Client Delivery is approval-gated.");
