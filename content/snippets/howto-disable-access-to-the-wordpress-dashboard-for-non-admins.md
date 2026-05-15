---
title: 'HowTo: Disable Access to the WordPress Dashboard for Non-Admins'
date: '2011-09-06'
tags:
  - dashboard
  - wordpress
  - wp-admin
---

**Update:** I had a few requested to bundle this into a plugin so I did. You can download it [here](http://wordpress.org/extend/plugins/remove-dashboard-access-for-non-admins/).

Currently, I'm working on a site where we didn't want non-admins to even be able to access the wp-admin dashboard. I searched around quite a bit looking for a complete shutoff-solution but most of the results detail how to literally disable the "Dashboard" menu in wp-admin.

Finally, trolling the comments on a like-solution in a [post by c. bavota](http://bavotasan.com/2008/hiding-the-wordpress-dashboard-for-non-admin-users/), I stumbled across a simplified version of bavotasan's function that does exactly what I want, plus it redirects unworthy users to the homepage!

The simplified function was authored by somebody going only by the moniker of [Jake](http://jupitercow.com/).

It's a pretty simple solution. It adds an action calling a function called 'redirect\_dashboard' which checks the user level, and if the currently-logged-in-user is unworthy, they get bounced to the homepage. Pretty neat. On line #4, the function checks the user level, with the default set as 'level\_10' or administrator. I modified this to 'level\_7' to exclude anyone below the Editor level, but you could choose whichever capability level suits your purpose. Vist the [Roles and Capabilities Codex page](http://codex.wordpress.org/Roles_and_Capabilities) to find out more about user levels.

Here's the snippet (which should be added to your theme's functions.php file)

\[php\] add\_action('admin\_init', 'no\_mo\_dashboard'); function no\_mo\_dashboard() { if (!current\_user\_can('manage\_options') && $\_SERVER\['DOING\_AJAX'\] != '/wp-admin/admin-ajax.php') { wp\_redirect(home\_url()); exit; } } \[/php\]
