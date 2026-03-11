import type { PlaybookPage } from "../types";

export const formsPlaybook: PlaybookPage = {
  section: "Components",
  page: "Forms",
  slug: "components/forms",
  description: "Inputs, selects, textareas, checkboxes, and switches with usage guidance.",
  status: "complete",
  openQuestions: [
    "Should we define validation message styling and placement rules?",
    "Do we need a form layout pattern (vertical vs horizontal labels)?",
  ],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Form components handle user input across the system. All inputs use Inter at the body weight, with subtle borders and a Forest Green focus ring. Every input must be paired with a visible label.",
    },
    {
      type: "component-spec",
      heading: "Form Components",
      components: [
        {
          name: "Text Input",
          description: "Standard text input field. Uses Inter at the body weight, with a subtle border and focus ring in Forest Green.",
          accessibilityNotes: "Always pair with a <Label>. Use htmlFor to associate label with input. Placeholder text is not a substitute for labels.",
          dos: [
            "Always pair with a visible Label above the input",
            "Use placeholder text for format hints, not labels",
            "Use the appropriate input type (email, tel, url, etc.)",
          ],
          donts: [
            "Never rely on placeholder text as the only label",
            "Don't use custom border colors — use the border token",
            "Avoid inline validation before the user has finished typing",
          ],
          code: `<div className="space-y-2">\n  <Label htmlFor="name">Full Name</Label>\n  <Input id="name" placeholder="e.g. Jane Doe" />\n</div>`,
        },
        {
          name: "Textarea",
          description: "Multi-line text input. Follows the same typography and spacing rules as the text input.",
          dos: [
            "Set a reasonable min-height or rows count",
            "Use for freeform text: comments, descriptions, notes",
          ],
          donts: [
            "Don't use for single-line inputs — use Input instead",
            "Avoid auto-resizing that causes layout shifts",
          ],
          code: `<div className="space-y-2">\n  <Label htmlFor="bio">Bio</Label>\n  <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />\n</div>`,
        },
        {
          name: "Select",
          description: "Dropdown select component for choosing from a predefined list of options.",
          dos: [
            "Use for 4+ options — fewer options may work better as radio buttons",
            "Provide a meaningful placeholder/default option",
          ],
          donts: [
            "Don't use for binary choices — use a Switch instead",
            "Avoid deeply nested option groups",
          ],
          code: `<Select>\n  <SelectTrigger>\n    <SelectValue placeholder="Select a role" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="admin">Admin</SelectItem>\n    <SelectItem value="editor">Editor</SelectItem>\n    <SelectItem value="viewer">Viewer</SelectItem>\n  </SelectContent>\n</Select>`,
        },
        {
          name: "Checkbox & Switch",
          description: "Binary toggle controls. Checkbox for opt-in acknowledgements, Switch for on/off settings.",
          dos: [
            "Use Checkbox for consent/agreement patterns",
            "Use Switch for instant-apply settings (no save button needed)",
          ],
          donts: [
            "Don't use a Switch when a save/submit action is required",
            "Avoid using checkboxes for navigation or filtering — use toggle buttons",
          ],
          code: `<div className="flex items-center gap-3">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">I agree to the terms</Label>\n</div>\n\n<div className="flex items-center gap-3">\n  <Switch id="notifications" />\n  <Label htmlFor="notifications">Enable notifications</Label>\n</div>`,
        },
      ],
    },
  ],
};
