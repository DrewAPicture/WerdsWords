---
title: Fun?! with Subversion and WordPress
date: '2011-08-24'
description: >-
  OK, so I'm a bit of a Cowboy Coder and after WordCamp San Francisco the other
  week, I've been mildly shamed into learning what I need to start using version
  control.
tags:
  - cowboy-coding
  - otto
  - subversion
  - svn
  - westi
---

OK, so I'm a bit of a [Cowboy Coder](http://www.bnj.com/cowboy-coding-pink-sombrero/) and after a session with [Mark Jaquith](http://markjaquith.com/) the other week at [WordCamp San Francisco](http://2011.sf.wordcamp.org/), I've been mildly shamed into learning what I need to start using version control.

At home I have a pretty high-powered gaming PC and when I'm on the go I'm using a MacBook Pro. So the first thing I did using a (somewhat old but relevant) [guide by Westi](http://blog.ftwr.co.uk/archives/2005/11/03/windows-wordpress-toolbox/) to setup [TortoiseSVN](http://tortoisesvn.tigris.org/) on my PC and started hooking up my WordPress Trunk build repo using SVN. Prior to now, I've always sort of done it the hard way, e.g. a whole lot of downloading and ftp-ing a couple of times a week.

First impression: SVN is kind of complicated at first, but once you sort of get the hang of it, it's a heckuva lot less work overall. After I got the hang of doing checkouts, updates and commits with my local repo, I got a little more ambitious and set out to get SVN setup on my VPS.

After an install, uninstall and re-install, I finally got all of the ra\_\* (See: Repository Access) modules in place that would allow me to checkout code from http & https URLs. Thanks to a very helpful [guide by Otto](http://ottopress.com/2011/creating-a-wordpress-site-using-svn/), I managed to setup svn:externals and perform a couple of checkouts and updates directly from the WordPress trunk and my VPS. Pretty neat.

NoteToSelf: Next time: Read about it, read about it, try, fail, try, fail, fail, WIN.
