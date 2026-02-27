

# Smart Welcome Panel Collapse After Onboarding

Make the Welcome panel aware of the user's onboarding state so it auto-collapses once the tour is complete, shows a shorter "Welcome back" view for returning users, and never dominates the sidebar after first run.

---

## Current Behavior

- Welcome panel reads collapse state from `localStorage` only -- it has no awareness of `onboarding_completed`
- The carousel finishing does NOT collapse the panel or update localStorage
- Returning users see the full "How it works" + "Start here" content every time they expand
- Dismissing the carousel via "X" (without completing) does not set `onboarding_completed`, but also doesn't affect the panel

## Changes

### 1. WelcomePanel -- onboarding-aware collapse default

**File: `src/components/WelcomePanel.tsx`**

- Accept a new prop `onboardingCompleted: boolean` from AppSidebar
- Change the initial collapsed state logic:
  - If `localStorage` has an explicit value, use it (user's manual preference wins)
  - If no localStorage value exists AND `onboardingCompleted` is `true`, default to collapsed
  - If no localStorage value AND `onboardingCompleted` is `false`, default to expanded (first-run)
- When expanded by a returning user (`onboardingCompleted === true`), show a compact "Welcome back" view: just the intro paragraph and "Take the tour" link -- hide the "How it works" list, "Start here" links, and "Method" quote
- When expanded by a first-run user (`onboardingCompleted === false`), show the full content as today

### 2. OnboardingTour -- collapse panel on completion

**File: `src/components/OnboardingTour.tsx`**

- Accept a new optional prop `onTourComplete?: () => void`
- Call `onTourComplete()` after `markCompleted()` in `handleSkip`, `handleFinish`, and `handleCta` (on last slide)
- Always call `markCompleted()` when finishing the last slide (currently only calls it if "Don't show again" is toggled) -- completing the tour should always mark onboarding done

### 3. AppSidebar -- wire the state together

**File: `src/components/AppSidebar.tsx`**

- Add state: `const [onboardingCompleted, setOnboardingCompleted] = useState(false)`
- On mount, query `profiles.onboarding_completed` for the current user
- Pass `onboardingCompleted` to `WelcomePanel`
- Pass `onTourComplete` callback to `OnboardingTour` that:
  1. Sets `onboardingCompleted` to `true`
  2. Writes `localStorage welcome_panel_collapsed = "true"` so the panel collapses immediately
- The WelcomePanel will re-render collapsed because localStorage now says collapsed

### 4. Mobile treatment (< 768px)

No separate modal needed -- the existing Collapsible already works inline. The collapsed state (single "Welcome" label line) takes minimal vertical space on any viewport. No additional changes required for this.

---

## State Flow

```text
First login:
  profiles.onboarding_completed = false
  localStorage: no key
  -> Panel EXPANDED (full content)
  -> Carousel auto-opens

User completes/skips carousel:
  profiles.onboarding_completed = true
  localStorage: welcome_panel_collapsed = "true"
  -> Panel COLLAPSES immediately

Returning user (next session):
  profiles.onboarding_completed = true
  localStorage: welcome_panel_collapsed = "true"
  -> Panel COLLAPSED by default

Returning user manually expands panel:
  -> Shows compact "Welcome back" view (2-3 lines only)
  localStorage: welcome_panel_collapsed = "false"

User clicks "Take the tour" from panel:
  -> Carousel opens, panel stays as-is
  -> On carousel close, panel does NOT auto-expand
```

---

## File-by-File Summary

| File | Changes |
|------|---------|
| `src/components/WelcomePanel.tsx` | Add `onboardingCompleted` prop; conditional initial collapse; compact "Welcome back" view for returning users |
| `src/components/OnboardingTour.tsx` | Add `onTourComplete` prop; always mark completed on finish/skip; call callback |
| `src/components/AppSidebar.tsx` | Query `onboarding_completed` on mount; pass props to WelcomePanel and OnboardingTour; handle tour completion callback |

No database changes needed -- uses existing `profiles.onboarding_completed` column and existing `localStorage` key.

