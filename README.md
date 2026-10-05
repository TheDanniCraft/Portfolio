# TheDanniCraft Portfolio

The production portfolio and inquiry application for [thedannicraft.de](https://thedannicraft.de). It is a Next.js server application, not a static export.

## Local development

```bash
bun install
bun run dev
```

Local configuration is injected from the Infisical project referenced by `.infisical.json`. No local `.env` file is required. Authenticate the Infisical CLI before running the development server.

## Verification

```bash
bun run lint
bun run typecheck
bun run build
```

## Dependency updates and CI

Renovate batches routine Bun and GitHub Actions updates into one pull request after a seven-day release cooldown. Security updates bypass the cooldown and are opened immediately.

GitHub Actions runs the verification commands above for pull requests and pushes to `master` using the committed lockfile. It can also be started manually.

HeroUI Pro authenticates while dependencies are installed. Add the licensed token as the `HEROUI_AUTH_TOKEN` GitHub Actions repository secret; the workflow exposes it only to the install step.

## Social previews and search metadata

`lib/metadata.ts` defines the production URL and shared Open Graph/Twitter image. Each route supplies its own title, description, and canonical path through `pageMetadata`. The interactive work page stays in `app/work/page.tsx`; its server metadata is exported by `app/work/layout.tsx`.

Next.js generates `/sitemap.xml` through `app/sitemap.ts` and `/robots.txt` through `app/robots.ts`. The sitemap includes public pages and case studies, excluding the `/about` redirect. `/llms.txt` is a cached text route generated from the same project catalog for AI tools that support the convention; it is not a Google ranking signal.

The 1200 × 630 banner is exported from the Penpot `Portfolio` file, on the `Social Preview` page (board `OG / TheDanniCraft / Start a project 01`, ID `76b2c126-1d02-804d-8008-bd91fffc4c22`). Its deployed asset is `public/og-image.png`. When replacing the artwork, export a PNG at 1×. Discord may retain an existing link preview after deployment; verify with a newly shared URL. Canonical URLs continue to point to the clean production paths.

## Privacy preferences

c15t currently runs in offline mode with a six-month consent lifetime. Privacy choices are stored only in the visitor's browser; no consent backend or audit history is created. Always-active first-party services remain available, while the third-party Morgen booking iframe is gated behind the optional `functionality` category.

When the application gains a database and authenticated customer features, migrate the provider to hosted mode and add the c15t backend schema and retention workflow before relying on server-side consent state.

## Coolify deployment

Deploy the repository as a Git-based application with these settings:

- Build pack: Railpack
- Base directory: `/`
- Static site: disabled
- Internal port: `3000`
- Health check path: `/api/health`
- Production branch: the release branch selected in Coolify
- Auto deploy: enabled through the Coolify GitHub App

Railpack reads [`railpack.json`](./railpack.json), installs the pinned Bun and Node runtimes, runs the detected `build` script, and starts the Next.js server with `bun run start`.

### Production environment

Sync or inject these values from Infisical into the Coolify application environment. Coolify supplies them to the Railpack build and the running application, so the deployed `build` and `start` commands do not invoke the Infisical CLI themselves. Keep secret values out of the repository:

```dotenv
NODE_ENV=production
HEROUI_AUTH_TOKEN=...
INQUIRY_DELIVERY_MODE=chatwoot
CHATWOOT_BASE_URL=https://chat.example.com
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_INBOX_ID=10
CHATWOOT_API_ACCESS_TOKEN=...
CAP_VERIFY_URL=https://challenge.cloud.thedannicraft.de/03d619b86e/siteverify
CAP_SECRET=...
```

`HEROUI_AUTH_TOKEN` is required at build time so the licensed HeroUI Pro package can finish installation. It is not a public application variable and must never use the `NEXT_PUBLIC_` prefix. `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_NAME` is optional and must also be marked as available at build time if configured because Next.js embeds public variables into the client bundle. The Chatwoot token and other server-only values must remain runtime secrets and must never use the `NEXT_PUBLIC_` prefix.

`CAP_SECRET` is the secret belonging to the configured Cap site key, not the Cap dashboard administrator key.

### Preview deployments

Keep production secrets out of preview deployments. The safe default is:

```dotenv
INQUIRY_DELIVERY_MODE=disabled
```

If inquiry delivery must be tested in previews, use a separate Chatwoot inbox and a restricted API token. Configure a wildcard preview DNS record and a preview URL template in Coolify, then enable preview deployments through the GitHub App integration.

### Chatwoot inquiry inbox

Create a dedicated Email inbox in Chatwoot for `projects@thedannicraft.de` and use its numeric inbox ID for `CHATWOOT_INBOX_ID`. The access token must belong to a Chatwoot user that can manage contacts and conversations in the configured account. Do not expose the token through a `NEXT_PUBLIC_` variable.

PurelyMail owns the public `projects@thedannicraft.de` mailbox. Forward a copy of its incoming messages to the generated address for inbox `10` while retaining the original message in PurelyMail. Amazon SES receives mail for `ingress.thedannicraft.de`, stores the raw message in the private inbound S3 bucket, and publishes the S3 notification to Chatwoot through SNS. Leave IMAP disabled for this inbox.

Chatwoot must use the SES Action Mailbox ingress with `MAILER_INBOUND_EMAIL_DOMAIN=ingress.thedannicraft.de`, `RAILS_INBOUND_EMAIL_SERVICE=ses`, and the configured `ACTION_MAILBOX_SES_SNS_TOPIC`. Its dedicated AWS identity requires only `s3:GetObject` for the inbound bucket's `mail/*` prefix. These `AWS_*` credentials are separate from the `STORAGE_*` credentials used by Chatwoot's MinIO-backed Active Storage.

Each successful form submission creates a new open conversation in the Email inbox with the visitor's normalized email as its channel source and a stable subject. Contacts are reused by email address. The submitted inquiry is stored as a private note because Chatwoot's Application API does not permit incoming messages on Email inboxes. Conversation-created automations still run, but workflows that specifically require an incoming customer message do not. Agent replies are sent by Chatwoot through the inbox SMTP configuration, and customer email replies return through the configured forwarding path.

For an end-to-end delivery test, submit the public form using an email address you control, reply from Chatwoot, verify that the reply is delivered from `projects@thedannicraft.de`, and reply to that email. The final reply should return to the same Chatwoot conversation. Chatwoot API failures are logged with the inquiry ID, failed stage, and HTTP status without logging the visitor's message or email address.

## Runtime endpoints

- `GET /api/health` returns application health and the Coolify `SOURCE_COMMIT` revision when available.
- The inquiry form verifies Cap server-side, then creates a contact and conversation with a private inquiry note in a dedicated Chatwoot Email inbox. It does not depend on n8n.
