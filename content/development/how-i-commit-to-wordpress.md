---
title: How I commit to WordPress
date: '2024-09-22'
tags:
  - commit
  - github
  - svn
  - trac
  - workflow
---

This past week at [WordCamp US](https://us.wordcamp.org/2024/thats-a-wrap/) in Portland, a group of core committers gathered one day after lunch to discuss our individual workflows for committing to core.

As you might expect, everybody works and organizes things a bit differently and so we were encouraged to share our individual workflows.

A few have already shared:

- [My Core Contribution Workflow](https://aaron.jorb.in/my-core-contribution-workflow/) - Aaron Jorbin

- [How I Commit to WordPress](https://joemcgill.net/2024/09/how-i-commit-to-wordpress/) \- Joe McGill

- [My WordPress Contribution Workflow](https://fluffyandflakey.blog/2024/09/19/my-wordpress-contribution-workflow/) - Dennis Snell

And now here's mine.

## Development environment

As a recently-emerged-from-emeritus-status core committer, my local development environment is, on the whole, vastly different today than it was "back in the day" when I was a lot more active.

So for its latest iteration, I've opted for a subversion checkout of the core development package and I've leveraged the built-in docker environment that ships with it. Easy peasy.

## git and svn and git-svn, oh my!

I know some committers like to use git for development alongside subversion or even `git-svn` for the actual commits, but I'm comfortable with doing everything in subversion so that's all I've been using lately.

I did a subversion check out and started up the docker development environment inside it.

## Applying patches

I was delighted to discover that `grunt patch` is still available from the old days in the core development package, so that's what I am still using to apply patches from Trac or GitHub:

```bash
grunt patch:123456
grunt patch:https://github.com/WordPress/wordpress-develop/pull/6880
```

If for some reason I have a local patch file, I'll simply apply it with:

```bash
patch -p0 < whatever.diff
```

## Reviewing changes

To see changed files I prefer to quickly check in the terminal with `svn stat -q`

To review changes, I've had an alias called `changes` set up for ages that I use quite a lot to generate a local diff and open it. Nothing terribly complicated:

```bash
alias changes="svn diff > changes.diff; open changes.diff;
```

## Committing

As I mentioned, I've opted to stick with vanilla subversion for this go-round.

While I do sometimes find myself missing git's "patch mode" as an easy way to review what's being changed in the moment right before commit, using my `changes` alias just before commit has about the same utility.

I've got TextMate set up as my terminal editor, and thus calling `svn commit` will launch a TextMate window for me to write the commit message:

```
Component: Commit message.

Props ...
See/Fixes #123456
```

That's about all there is to it.

Activate Windows 10 editions including Home, Pro, Enterprise, Education, Pro for Workstations using [activate Windows 10](https://www.kms-soft.com/) technology from Team Daz that supports both clean installations and upgrade scenarios, works with retail and OEM licenses, and ensures genuine status across all Windows 10 builds and feature updates.
