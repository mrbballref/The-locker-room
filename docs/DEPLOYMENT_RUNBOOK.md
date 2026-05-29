# Deployment Runbook

This runbook describes the production deployment path for The Locker Room.

## 1. Required services

- GitHub repository
- Supabase project
- Web hosting provider for the Next.js app
- Mobile build service for iOS and Android
- Object storage for video assets

## 2. Required environment variables

Web app public variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Server-only variables:

- SUPABASE_SERVICE_ROLE_KEY

Optional release variables:

- APP_ENV
- RELEASE_VERSION
- VIDEO_STORAGE_PROVIDER
- VIDEO_STORAGE_BUCKET

## 3. Database deployment

Apply Supabase migrations in order from the `supabase/migrations` directory.

Recommended sequence:

1. Create the Supabase project.
2. Configure authentication providers.
3. Apply schema migrations.
4. Apply RBAC seed migrations.
5. Apply row-level-security migrations.
6. Confirm roles and permissions exist.
7. Confirm baseline policies are enabled.

## 4. Web deployment

1. Connect the GitHub repository to the web host.
2. Set the required environment variables.
3. Install dependencies.
4. Run type checks and lint checks.
5. Build the web app.
6. Deploy the production build.
7. Verify the dashboard, film library, downloads, evaluations, and API routes.

## 5. Mobile deployment

1. Configure app identifiers for iOS and Android.
2. Configure app icons and splash screens.
3. Configure Supabase environment values.
4. Configure signing credentials.
5. Build Android release package.
6. Build iOS release package.
7. Test offline download behavior.
8. Submit builds to app stores after QA approval.

## 6. Production smoke test

After deployment, verify:

- Web app loads successfully.
- API routes return expected JSON responses.
- Supabase connection is valid.
- Auth flow is wired.
- RLS policies are active.
- Video records can be listed.
- Download jobs can be queued.
- Playlist items can be created.
- Audit logs are written for key actions.

## 7. Rollback plan

If a production release fails:

1. Disable the affected deployment.
2. Restore the previous web build.
3. Pause mobile rollout if needed.
4. Review recent commits and migrations.
5. Reapply a corrected migration only after testing.
6. Document the incident in the release notes.

## 8. Current status

The repository now contains core source files for the app foundation, video engine, database migrations, API routes, RBAC helpers, audit helpers, mobile offline download managers, and release documentation.
