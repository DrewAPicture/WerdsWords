---
title: Plugin repo bookmarklet
date: '2013-07-14'
tags:
  - bookmarklet
  - plugins
  - svn
  - wordpress
---

Sometimes when I'm checking out plugins in the WordPress.org repository, I like to view the source before I download. So partly out of boredom and partly out of laziness, I decided to create a bookmarklet that jumps you from a WordPress.org-hosted plugin page to its subversion repository.

The bookmarklet: **[Plugin Repo](<javascript:\(function\(\){var split=window.location.pathname.split\('/'\);location.href='http://plugins.svn.wordpress.org/' + split[2] + '/trunk/'}\)\(\);>)**

To use the bookmarklet:

1. Drag the above 'Plugin Repo' link to your bookmarks bar
2. Visit any plugin page (or plugin's sub-page) in the WordPress.org plugin repository
3. Click the bookmarklet and you will be sent to that plugin's SVN repo trunk url
4. Boom.
