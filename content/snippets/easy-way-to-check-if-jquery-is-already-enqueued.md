---
title: Easy way to check if jQuery is already enqueued
date: '2012-05-13'
tags:
  - wordpress
  - wp_enqueue_script
---

Had a plugin wreaking some havoc today because it was overloading jquery.js with a minified, older version. Plugin authors: There's a really simple way to check if jQuery or a jQuery library is already registered and enqueued. This covers really obscure edge cases where a plugin may have de-registered WordPress's default scripts.

The offending code:

\[php\] wp\_register\_script('myjquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', true, '1.6.4', false); wp\_enqueue\_script('myjquery'); \[/php\]

The fix:

\[php\] // If jQuery isn't already enqueued, register and enqueue it if ( ! jQuery ) { wp\_register\_script('myjquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', true, '1.7.2', false); wp\_enqueue\_script('myjquery'); } \[/php\]
