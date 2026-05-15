---
title: New local-to-live deployment plugin falls a bit short
date: '2012-05-02'
tags:
  - deployment
  - github
  - staging
  - versioning
---

A new local-to-live deployment plugin called [WP Live Server Deploy](http://wordpress.org/extend/plugins/wp-live-server-deploy/) was brought to my attention last week by a [post](http://wpforce.com/live-server-deploy-to-assist-in-dev-to-production-migration/) over at WP Force.

The plugin boasts an automated set of features to handle the menial tasks of MySQL dumps + find & replace, plus handling your file transfers. Out of the box it seemed pretty promising. I'd say the biggest disappointment out of the box is a complete lack of SFTP/SSH support for the transfer. You can only do so much over FTP alone and the plugin failed miserably to handle the MySQL part of the equation.

Along that vein, there's a so-called "Manual" option for handling the MySQL dumps. This would be fine, except that it doesn't work -- it nets an empty SQL file. I'd say @sagetarian has some work to do yet, but I'm looking forward to seeing another iteration. You can download the plugin via the WP.org repo and/or follow development on [Github](https://github.com/sagetarian/wp-live-server-deploy).
