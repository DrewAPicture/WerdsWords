---
title: 'parse_git_branch() stopped working after Xcode 6.0.1 update [FIX]'
date: '2014-09-24'
tags:
  - bash
  - git
  - parse_git_branch
  - shell
---

I got a little surprise after I updated Xcode and the Command Line Tools this morning: the bash prompts in my shell had stopped displaying the current git branch. Eeek!

For those of you who aren't familiar with `parse_git_branch()`, it's a small bash script that simply highlights the current git branch at the end of the bash prompt. It lives in your ~/.bash\_profile or ~/.bashrc file.

When it's working, it looks something like this:

`$ (master)` (where (master) is the current git branch)

Some people use tools like [zsh](https://github.com/robbyrussell/oh-my-zsh) or [liquidprompt](https://github.com/nojhan/liquidprompt) to accomplish the same effect, but I use this little bash function because I don't need all that extra stuff.

I poked around the web for a while this morning and couldn't find any solutions.

Turns out, it's a simple fix:

1. Open Xcode
2. Click to Agree to the new terms
3. Install the remaining components
4. Reload your shell of choice

Hope that helps somebody.

If you're interested in using `parse_git_branch()` yourself, you can simply put the following into your ~/.bash\_profile or ~/.bashrc file:

\[bash\] function parse\_git\_branch() { git branch 2> /dev/null | sed -e '/^\[^\*\]/d' -e 's/\* \\(.\*\\)/ (\\1)/' }

RED="\\\[\\033\[0;31m\\\]" YELLOW="\\\[\\033\[0;33m\\\]" GREEN="\\\[\\033\[0;32m\\\]" NO\_COLOUR="\\\[\\033\[0m\\\]"

PS1="$GREEN\\u-MBA$NO\_COLOUR:\\w$YELLOW\\$(parse\_git\_branch)$NO\_COLOUR\\$ " \[/bash\]

There's also a couple of non-sed versions floating around the web if that's your preference. Adjust the [colors](http://www.ibm.com/developerworks/linux/library/l-tip-prompt/) as needed.
