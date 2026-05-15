---
title: WordPress 3.3 Could Improve Child Theme Integration
date: '2011-07-31'
description: >-
  According to a recent WordPress trac ticket, theme authors could soon be
  rewarded with a little nugget of functionality that would make using child
  themes much more extensible.
tags:
  - child-themes
  - enqueue-script
  - johnbillion
  - trac
---

![](http://www.werdswords.com/wp-content/uploads/2011/07/Trac_Logo_512x512.preview-150x150.png "Trac_Logo_512x512.preview")According to a [recent](http://core.trac.wordpress.org/ticket/18302) WordPress trac ticket, theme authors could soon be rewarded with a little nugget of functionality that would make using child themes much more extensible.

The ticket suggests introducing a function that works similarly to locate\_template(), but rather than returning the path of the file (in the parent theme only), it would return a URI to the file, thus allowing a child theme to override the parent's .js, .css and even image files. The proposed function is called locate\_theme\_file().

According to the suggested patch posted by [johnbillion](http://core.trac.wordpress.org/query?status=!closed&reporter=johnbillion), this is the current method for loading template files in parent themes only: \[php\]

wp\_enqueue\_style( 'dark', get\_template\_directory\_uri() . '/colors/dark.css', array(), null );

\[/php\]

If locate\_theme\_file() is introduced, we could instead see functions like these:

\[php\]

wp\_enqueue\_style( 'dark', locate\_theme\_file( 'colors/dark.css' ), array(), null );

wp\_enqueue\_style( 'bar', locate\_theme\_file( 'bar.css' ) );

<img src="<?php echo locate\_theme\_file( 'icon.png' ); ?>" />

\[/php\]

locate\_theme\_file() would automatically load any of these files via the child theme, BEFORE the parent. Pretty neat huh?

Up to this point, child themes could only override a parent theme's template files. If theme authors are rewarded with the ability to enqueue many more types of files at the child theme level with this much ease, I anticipate seeing some really exciting new uses for child themes emerging.
