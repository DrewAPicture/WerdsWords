---
title: Add 'Edit User' Toolbar link on author archives
date: '2012-09-14'
tags:
  - edit_users
  - toolbar
  - usability
  - users
  - wp_admin_bar
---

Currently it takes 3-4 steps to get to a user's edit screen from the front-end, which really comes down to a lot of wasted time when you're working on a user-heavy site. One of my biggest usability pet peeves is unnecessary extra steps. On the WordPress front-end, we have 'Edit \*' Toolbar links for objects like taxonomy terms and post types, so why not users?

The question was [raised recently](http://core.trac.wordpress.org/ticket/20307) by John Blackbourn on Trac and I think it has a lot of merit. I'll concede that the inherent behavior of an edit link on an archive shouldn't be to edit an object but an author archive (usually) serves dual purposes: Author info and author archive.

Here's the snippet I worked up from @lessbloat's [revised patch](http://core.trac.wordpress.org/attachment/ticket/20307/20307-2.patch):

\[php\] function ww\_toolbar\_edit\_user\_link( $wp\_admin\_bar ) { $current = get\_queried\_object(); // Check that it's a WP\_User object and user is editable if ( is\_a( $current, 'WP\_User' ) && current\_user\_can( 'edit\_user', $current->ID ) ) { // Add the menu $wp\_admin\_bar->add\_menu( array( 'id' => 'edit', 'title' => \_\_( 'Edit User' ), 'href' => get\_edit\_user\_link( $current->ID ), 'meta' => array( 'title' => \_\_( 'Edit User' ) ) ) ); } } add\_action( 'admin\_bar\_menu', 'ww\_toolbar\_edit\_user\_link', 81 ); \[/php\]
