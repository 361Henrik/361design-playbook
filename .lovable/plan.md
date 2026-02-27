

# Fix Authentication Flow

Two issues prevent sign-in from working:

1. **Password mismatch** -- The password entered at login doesn't match the one used during the original signup. There is no "Forgot Password" flow to recover.
2. **No roles assigned** -- The signup code tries to insert into `user_roles`, but RLS only allows admins to insert roles. A brand-new user has no roles yet, so the insert silently fails. The first user can never bootstrap as admin.

---

## Changes

### 1. Database migration: fix role bootstrapping + assign admin to existing user

- Create a `assign_initial_role()` database function (SECURITY DEFINER) that runs after signup. It checks if the user is the first user and assigns `admin`, otherwise `editor`. This bypasses RLS safely.
- Create a trigger on `auth.users` AFTER INSERT that calls this function (or use the existing `handle_new_user` trigger pattern).
- Fix the existing user: insert `(3905065d-33fe-4446-977c-a50dfd111e81, 'admin')` into `user_roles` via migration.
- Remove the client-side role insertion from `Auth.tsx` (lines 44-51) since it fails due to RLS and belongs server-side.

### 2. Add password reset flow to Auth.tsx

- Add a "Forgot password?" link on the login tab.
- Call `supabase.auth.resetPasswordForEmail()` with `redirectTo` pointing to `/reset-password`.
- Show a toast confirming the reset email was sent.

### 3. Create /reset-password page

- New file: `src/pages/ResetPassword.tsx`
- Detects `type=recovery` in URL hash (set by the auth system's email link).
- Shows a form to enter a new password.
- Calls `supabase.auth.updateUser({ password })`.
- Redirects to `/` on success.

### 4. Update routing in App.tsx

- Add `/reset-password` as a public route (not behind `ProtectedRoutes`).

---

## Files to create

| File | Purpose |
|------|---------|
| Migration SQL | Assign admin role to existing user; create `assign_initial_role()` SECURITY DEFINER function + trigger |
| `src/pages/ResetPassword.tsx` | Password reset form |

## Files to modify

| File | Change |
|------|--------|
| `src/pages/Auth.tsx` | Remove client-side role insert (lines 44-51); add "Forgot password?" link and handler |
| `src/App.tsx` | Add `/reset-password` route |

---

## Technical details

### The SECURITY DEFINER function

```sql
CREATE OR REPLACE FUNCTION public.assign_initial_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INT;
BEGIN
  SELECT count(*) INTO user_count FROM public.user_roles;
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'editor');
  END IF;
  RETURN NEW;
END;
$$;
```

This runs server-side with elevated privileges, bypassing RLS. It is attached as an AFTER INSERT trigger on `auth.users` (same pattern as the existing `handle_new_user` trigger).

### Immediate fix for the existing user

The migration also runs:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('3905065d-33fe-4446-977c-a50dfd111e81', 'admin')
ON CONFLICT DO NOTHING;
```

This unblocks the current account once the password is reset.
