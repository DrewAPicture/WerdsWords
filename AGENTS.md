# WerdsWords 2.0 — Agent Guidelines

## Stop Conditions

**Stop and ask the user before proceeding if any of the following apply:**

- You are about to commit, push, or modify git history in any way
- The working tree is dirty before a branch switch, reset, or merge
- You are considering a force push — this is never permitted
- You are unsure whether a destructive action is reversible

Commit authorization is **task-scoped**: explicit approval to commit during one task does not carry over to follow-up tasks or future sessions. Always assume you do not have commit permission unless the user has said so in the current task.

See full protocol: [`.agent/context/best-practices/best-practices/git-safety-protocol.md`](.agent/context/best-practices/best-practices/git-safety-protocol.md)

---

## Project

WerdsWords 2.0 is a static markdown blog built with Eleventy v3 and Nunjucks. Posts live in `content/`, organized by category (subdirectory). The site is built to `_site/`.

- [Architecture](.agent/context/architecture.md) — directory structure, collections, permalink routing, raw markdown serving
- [Design Decisions](.agent/context/design-decisions.md) — why Eleventy, why Nunjucks, key trade-offs

---

## Best Practices

- [Commit Messages](.agent/context/best-practices/best-practices/commit-messages.md) — imperative tense, no emoji, HEREDOC format
- [Git Safety Protocol](.agent/context/best-practices/best-practices/git-safety-protocol.md) — check working tree, no force push, commit scope
- [Accessibility](.agent/context/best-practices/best-practices/accessibility.md) — WCAG 2.2 Level AA for all rendered views

---

## Node Version

This project requires Node ≥ 18. Node 25 (`nvm use 25`) is used locally. Run `source ~/.nvm/nvm.sh && nvm use 25` before any `npm` command.
