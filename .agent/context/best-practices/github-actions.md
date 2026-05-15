# GitHub Actions Best Practices

## Pin actions to full commit SHAs

Never reference an action by a mutable version tag (`@v4`, `@main`, `@latest`). Tags can be silently moved to a different commit; a SHA cannot. This is a supply-chain security requirement for any public repo.

**Pattern:**
```yaml
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

The inline comment preserves human-readable intent without sacrificing immutability.

**How to find the SHA:**  
Go to the action's GitHub page → Releases → click the tag you want → copy the full commit SHA from the URL or the commit list.

### Common actions used in this project

| Action | Pinned example |
|---|---|
| `actions/checkout` | `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2` |
| `actions/setup-node` | `actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af  # v4.1.0` |
| `softprops/action-gh-release` | `softprops/action-gh-release@c062e08bd532815e2082a85e87e3ef29c3e6d191  # v2.2.1` |
| `webfactory/ssh-agent` | `webfactory/ssh-agent@a6f90b1f127823b31d4d4a8d96047790581349bd  # v0.9.1` |

Always re-verify SHAs against the action's releases page before committing — these examples may go stale.

---

## Keep all sensitive values in GitHub Secrets

This is a public repository. No identifying or infrastructure detail may appear in workflow files in plain text. Apply the same redaction policy as [Sensitive Information](../../sensitive-information.md).

**Never hardcode:**
- SSH hostnames or IP addresses
- SSH ports
- SSH usernames
- Server-side directory paths
- Private keys or tokens (beyond `GITHUB_TOKEN`, which is auto-provided)

**Always use `${{ secrets.NAME }}`:**

```yaml
# Bad — reveals infrastructure
- run: rsync -avz -e "ssh -p 2200" _site/ deploy@192.0.2.10:/home/deploy/public_html/

# Good — nothing identifying is in the workflow file
- run: rsync -avz --delete -e "ssh -p ${{ secrets.SSH_PORT }}" _site/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}
```

### Secrets required for this project's deploy workflow

| Secret | What it holds |
|---|---|
| `SSH_HOST` | Server hostname or IP |
| `SSH_PORT` | SSH port number |
| `SSH_USER` | SSH login username |
| `SSH_PRIVATE_KEY` | Full contents of the private key file |
| `DEPLOY_PATH` | Remote path to the web root |

`GITHUB_TOKEN` is injected automatically — do not create a secret for it.

---

## Do not expose secret values in logs

GitHub automatically masks `${{ secrets.* }}` in step output. Do not work around this by echoing secrets into intermediate variables or files that are then logged. If a value must be masked that isn't a native secret, prefix its echo with `::add-mask::`:

```yaml
- run: |
    VALUE=$(some-command)
    echo "::add-mask::$VALUE"
```

---

## Pre-commit check for workflow files

Before committing any file under `.github/workflows/`, verify:

1. Every `uses:` line references a full 40-character SHA, not a tag or branch name
2. No literal hostnames, IP addresses, ports, usernames, paths, or credentials appear in plain text
3. All sensitive values are accessed via `${{ secrets.NAME }}`

See [Sensitive Information](../../sensitive-information.md) for the full redaction checklist.
