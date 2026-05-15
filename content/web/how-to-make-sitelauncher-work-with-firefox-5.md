---
title: How to Make SiteLauncher Work With Firefox 5
date: '2011-07-24'
tags:
  - addons
  - firefox
  - firefox-5
  - sitelauncher
---

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-0.jpg "sitelauncher-0")

Being a Web-worker, I rely on my browser to provide the tools I need to work quickly and efficiently. And since I'm an avid Firefox user, the last couple of months have been fraught with turmoil because I was torn between staying with the trends and updating Firefox (first from 3.6 to 4, then recently from 4 to 5) and waiting for the developers of all of my add-ons to keep up.

I waited and waited and waited to upgrade Firefox to version 5 because I was holding out for the developer of [SiteLauncher](http://www.donesmart.com/sitelauncher/), to be updated. SiteLauncher is integral to my workflow, because it allows me to open specific webpages using preset keyboard shortcuts.

Turns out, I didn't need to wait.

Thanks to the folks over at [The Heat Web](http://theheatweb.com/sitelauncher-work-firefox-5/), making SiteLauncher 2.1.0 compatible with Firefox 5 was as easy as changing a value in a file.

There are two ways to do this:

## 1) The Easy Way

» Download/install this (already modified) file [sitelauncher2.1.0.xpi](http://www.werdswords.com/wp-content/uploads/sitelauncher2.1.0.xpi) and restart Firefox

## 2) The Hard-er Way

» Visit the SiteLauncher Download Page, right-click the Add SiteLauncher to Firefox button and click Save As. Save _sitelauncher2.1.0.xpi_ to your hard disk.

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-1.jpg "sitelauncher-1")

» Open the directory where you saved _sitelauncher2.1.0.xpi_ and change the file extension to .zip (_sitelauncher2.1.0.zip_)

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-2.jpg "sitelauncher-2")

» **Important:** Open the .zip file in your archival software. **DO NOT UNZIP THE DIRECTORY**.

» Right click on install.rdf and open it in NotePad (or TextEdit on Mac)

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-3.jpg "sitelauncher-3")

» Locate the _maxversion_ value and change it from _4.2alpre_ to something above 5. I changed mine to _5.9.9_ to make it compatible all the way to Firefox 6.

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-4.jpg "sitelauncher-4")

» Save _install.rdf_ and update the archive

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-5.jpg "sitelauncher-5")

» Back in the directory where you saved the original file, change the file extension back to _.xpi_ from _.zip_

![](http://www.werdswords.com/wp-content/uploads/2011/07/sitelauncher-6.jpg "sitelauncher-6")

» All you have to do now, is drag the _sitelauncher2.1.0.xpi_ file over to your Firefox window and it should prompt you to install the add-on.

» That's it!

**Update:** Though this hack makes your SiteLauncher keyboard shortcuts work, you're still unable to modify or add new shortcuts via the backend menus. Thanks Steven!
