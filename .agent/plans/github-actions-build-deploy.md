# Plan: GitHub Actions — Build & Deploy

## Context

The site has no CI/CD. We need three workflows: one that validates content pushes build successfully without publishing a release, one that builds the Eleventy site and cuts a versioned GitHub Release, and one that deploys a release artifact to the production server via rsync over SSH. Server details are stored as secrets since this is a public repo.

All action version references must be pinned to full commit SHAs per the GitHub Actions best-practices policy.

---

## Workflow 1 — Validate (`.github/workflows/validate.yml`)

**Trigger:** `push` to `main`, filtered to content-affecting paths only:
- `content/**`
- `_includes/**`
- `_data/**`
- `.eleventy.js`

**Purpose:** Confirm the site builds without error on every qualifying content push. Does not produce an artifact or create a release.

**Steps:**
1. `actions/checkout@<sha>` — shallow checkout (default depth is fine)
2. `actions/setup-node@<sha>` — Node 20 LTS, with npm cache
3. `npm ci`
4. `npm run build`

**Permissions required:** none beyond defaults (read-only)

---

## Workflow 2 — Build (`.github/workflows/build.yml`)

**Trigger:** `workflow_dispatch` with an optional `tag` input.  
If no tag is supplied, the job reads the latest git tag, parses it as semver, and auto-increments the patch component (e.g. `v1.2.3` → `v1.2.4`). First-ever build defaults to `v0.0.1`.

**Steps:**
1. `actions/checkout@<sha>` with `fetch-depth: 0` (required to read all tags)
2. Compute tag — bash: strip `v`, split on `.`, increment patch; or use provided input
3. `actions/setup-node@<sha>` — Node 20 LTS, with npm cache
4. `npm ci`
5. `npm run build`
6. `zip -r site.zip _site/`
7. `softprops/action-gh-release@<sha>` — creates the tag, names the release, attaches `site.zip`, auto-generates release notes from commits

**Permissions required:** `contents: write` (to push the tag and create the release)

---

## Workflow 3 — Deploy (`.github/workflows/deploy.yml`)

**Triggers:**
- `release: published` — fires automatically after Build creates a release
- `workflow_dispatch` with a required `tag` input — for manual re-deploys of any prior release

**Steps:**
1. Determine tag (from release event or manual input)
2. `gh release download <tag> --pattern "site.zip" --repo <repo>` using `GITHUB_TOKEN`
3. `unzip site.zip`
4. `webfactory/ssh-agent@<sha>` — loads `SSH_PRIVATE_KEY` into the agent
5. `ssh-keyscan -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts` — trusts the host at runtime
6. `rsync -avz --delete -e "ssh -p ${{ secrets.SSH_PORT }}" _site/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}`

**Permissions required:** `contents: read`

---

## Secrets to add in GitHub repo settings

| Secret name | Value |
|---|---|
| `SSH_HOST` | Server hostname or IP |
| `SSH_USER` | SSH login username |
| `SSH_PRIVATE_KEY` | Full contents of the private key file |
| `SSH_PORT` | SSH port number |
| `DEPLOY_PATH` | Remote path to the web root |

`GITHUB_TOKEN` is provided automatically — no secret needed for the release download.

---

## Files to create

- `.github/workflows/validate.yml` _(pending)_
- `.github/workflows/build.yml` _(done)_
- `.github/workflows/deploy.yml` _(done)_

No existing files are modified.

---

## Verification

1. Push a content change to `main` — confirm the **Validate** workflow triggers and the build succeeds; confirm **Build** and **Deploy** do not trigger
2. Go to **Actions → Build → Run workflow** — leave tag blank; confirm the job computes `v0.0.1`, builds successfully, and a release appears on the Releases page with `site.zip` attached
3. Confirm the **Deploy** workflow triggers automatically on that release publish; check server at `https://werdswords.com` to verify content
4. Re-run Build with an explicit tag (`v1.0.0`) — confirm the release is named correctly
5. Use Deploy's manual dispatch to re-deploy `v0.0.1` — confirm it completes without error
