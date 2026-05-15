---
title: Get email alerts about 404 errors on your WordPress site
date: '2013-02-26'
tags:
  - '404'
  - alerts
  - email
  - errors
---

Ever wanted to get email alerts about 404 errors on your WordPress site?

[Jeff Starr](http://www.twitter.com/perishable "@perishable on Twitter") over at WP Mix [posted a snippet](http://wp-mix.com/wordpress-404-email-alerts/ "WordPress 404 Email Alerts | WP Mix") yesterday for doing just that. And I, having a little time on my hands, decided to give it the ol' OOP-once-over.

The original WP Mix post called for dropping the entire snippet into the top of your WordPress theme's 404.php file, but I generally don't like to clutter up my template files with extra non-theme stuff. So I converted it into a class which can then be easily instantiated in with these two lines:

\[php\] if ( class\_exists( 'Clean\_404\_Email' ) ) new Clean\_404\_Email; \[/php\]

Not bad, considering the original snippet called for dropping in 83 lines of extra code!

I also converted the email format to a [use a table](http://cl.ly/image/0G2Q0N0K3y1k), just so it's a little more orderly about it.

Many users take advantage of freely-available tools like Google's [Webmaster Tools](https://www.google.com/webmasters/tools/home?hl=en) or other services to track a site's 404 errors. This class gives you the short and sweet of it, and there's no waiting around. If somebody gets a 404 on your site, WordPress will email you on the spot.

The [gist](https://gist.github.com/DrewAPicture/5032207 "Clean 404 Emails - OOP Style | Gist") is available on GitHub and also embedded below.

<script src="https://gist.github.com/DrewAPicture/5032207.js"></script>

_Photo used under CC. Photo by Jeremy Keith (adactio/Flickr)_
