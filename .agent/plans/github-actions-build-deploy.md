# Plan: GitHub Actions — Build & Deploy

## Context

The site has no CI/CD. We need two workflows: one that builds the Eleventy site and cuts a versioned GitHub Release, and one that deploys a release artifact to the production server via rsync over SSH. Port 2200 and other server details are stored as secrets since this is a public repo.

---

## Workflow 1 — Build (`.github/workflows/build.yml`)

**Trigger:** `workflow_dispatch` with an optional `tag` input.  
If no tag is supplied, the job reads the latest git tag, parses it as semver, and auto-increments the patch component (e.g. `v1.2.3` → `v1.2.4`). First-ever build defaults to `v0.0.1`.

**Steps:**
1. `actions/checkout@v4` with `fetch-depth: 0` (required to read all tags)
2. Compute tag — bash: strip `v`, split on `.`, increment patch; or use provided input
3. `actions/setup-node@v4` — Node 20 LTS, with npm cache
4. `npm ci`
5. `npm run build`
6. `zip -r site.zip _site/`
7. `softprops/action-gh-release@v2` — creates the tag, names the release, attaches `site.zip`, auto-generates release notes from commits

**Permissions required:** `contents: write` (to push the tag and create the release)

---

## Workflow 2 — Deploy (`.github/workflows/deploy.yml`)

**Triggers:**
- `release: published` — fires automatically after Build creates a release
- `workflow_dispatch` with a required `tag` input — for manual re-deploys of any prior release

**Steps:**
1. Determine tag (from release event or manual input)
2. `gh release download <tag> --pattern "site.zip"` using `GITHUB_TOKEN`
3. `unzip site.zip`
4. `webfactory/ssh-agent@v0.9.0` — loads `SSH_PRIVATE_KEY` into the agent
5. `ssh-keyscan -p $SSH_PORT $SSH_HOST >> ~/.ssh/known_hosts` — trusts the host at runtime
6. `rsync -avz --delete -e "ssh -p $SSH_PORT" _site/ $SSH_USER@$SSH_HOST:/home/drewby/public_html/`

---

## Secrets to add in GitHub repo settings

| Secret name | Value |
|---|---|
| `SSH_HOST` | Server hostname or IP |
| `SSH_USER` | SSH login username |
| `SSH_PRIVATE_KEY` | Full contents of the private key file |
| `SSH_PORT` | `2200` |

`GITHUB_TOKEN` is provided automatically — no secret needed for the release download.

---

## Files to create

- `.github/workflows/build.yml`
- `.github/workflows/deploy.yml`

No existing files are modified.

---

## Verification

1. Push the two workflow files to `main`
2. Go to **Actions → Build → Run workflow** — leave tag blank; confirm the job computes `v0.0.1`, builds successfully, and a release appears on the Releases page with `site.zip` attached
3. Confirm the **Deploy** workflow triggers automatically on that release publish; check server at `https://werdswords.com` to verify content
4. Re-run Build with an explicit tag (`v1.0.0`) — confirm the release is named correctly
5. Use Deploy's manual dispatch to re-deploy `v0.0.1` — confirm it completes without error
