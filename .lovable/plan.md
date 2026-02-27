

# Fix Password Reset Flow

Two root causes are preventing password recovery from working.

---

## Problem 1: Reset link redirects to wrong URL

The authentication system has a "Site URL" and "Redirect URLs" allowlist. The password reset email link redirects through the auth server, which then sends the user to the configured site URL with recovery tokens. If the preview URL isn't registered, the redirect silently fails.

### Fix

Use the auth configuration tool to:
- Set the Site URL to the current preview URL
- Add the preview URL + `/reset-password` to the allowed redirect URLs

---

## Problem 2: Email rate limiting

Multiple signup and reset attempts have likely exhausted the default email rate limit (3-4 per hour per address). No code fix needed -- just wait ~1 hour and try once more. Also check spam/junk folders.

---

## Problem 3: ResetPassword page robustness

The current page relies on detecting `type=recovery` in the URL hash or the `PASSWORD_RECOVERY` auth event. This can be fragile if the auth system uses PKCE flow (which puts tokens in query params, not the hash). The page should also handle the case where the session is already established by the time the component mounts.

### Fix

Update `ResetPassword.tsx` to:
- Also check for an existing session on mount (the auth callback may have already processed tokens before React renders)
- Show the password form if a valid session exists, regardless of how it was established
- Add a manual "re-send reset email" option so the user doesn't have to navigate back to `/auth`

---

## Implementation Steps

### 1. Configure auth redirect URLs
Use the auth settings tool to add the preview URL to the allowed redirect list.

### 2. Update ResetPassword.tsx
- On mount, call `supabase.auth.getSession()` -- if a session exists, show the form immediately (the recovery token was already exchanged)
- Keep the `PASSWORD_RECOVERY` event listener as a fallback
- Add a "Request new link" button that calls `resetPasswordForEmail` directly from this page

### 3. Update Auth.tsx
- After calling `resetPasswordForEmail`, navigate to `/reset-password` so the user lands on the right page and can request another link if needed

---

## Files to modify

| File | Change |
|------|--------|
| Auth config | Add preview URL to redirect allowlist |
| `src/pages/ResetPassword.tsx` | Check for existing session on mount; add re-send link option |
| `src/pages/Auth.tsx` | Navigate to `/reset-password` after sending reset email |

