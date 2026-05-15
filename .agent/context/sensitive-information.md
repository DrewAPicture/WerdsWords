# Sensitive Information — Strip Before Committing

This is a public repository. Before committing any file, scan it for the following categories of identifying or sensitive information and redact or remove them.

---

## What to strip

**Credentials and secrets**
- Passwords, API keys, tokens, private keys, secrets
- `.env` values or anything that looks like `SECRET=`, `KEY=`, `TOKEN=`, `PASSWORD=`

**Infrastructure details**
- SSH ports (e.g. `-P 2200`) → replace with `<port>`
- IP addresses (public or private)
- Internal hostnames, server paths, or directory structures specific to the hosting account
- Database names, usernames, or connection strings

**Personal identifiers**
- Email addresses not intended for public display
- Phone numbers
- Home addresses

**Filesystem paths**
- Absolute local paths (e.g. `/Users/drew/...`, `/home/user/...`) → use relative paths or placeholders
- Remote server paths that reveal account or directory structure

---

## Where this most commonly appears

- Plan files and docs referencing shell commands (SSH, SCP, wp-cli)
- Scripts that hard-code server details
- Frontmatter or config values copied from local environments
- Inline comments referencing local setup

---

## How to redact

Replace sensitive values with descriptive placeholders:

| Original | Replacement |
|---|---|
| `-P 2200` | `-P <port>` |
| `user@yourserver.com:/home/user/wp` | `user@yourserver.com:/path/to/wordpress` |
| `/Users/drew/Desktop/...` | `./` or a relative path |
| `SECRET_KEY=abc123` | `SECRET_KEY=<your-secret-key>` |

---

## Stop condition

If you discover sensitive information in a file that has already been pushed to the remote, **stop and tell the user immediately** before doing anything else. Do not attempt to rewrite git history.
