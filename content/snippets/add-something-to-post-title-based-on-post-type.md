---
title: Add something to post title based on post type
date: '2011-07-12'
description: >-
  Recently, I was working on a WordPress install employing several custom post
  types to handle multiple blogs. The site used normal 'posts' to handle
  articles and the client wanted to append the word "BLOG" to the beginning of
  blog posts' titles only.
tags:
  - blogs
  - custom-post-types
  - the_title
---

Recently, I was working on a WordPress install employing several custom post types to handle two separate "blogs" within a single site. The site used normal 'posts' to handle articles and the client wanted to append the word "BLOG" to the beginning of blog posts' titles only.

Using [the Codex](http://codex.wordpress.org/Function_Reference/the_title) I slapped something together rather easily.

Using the following snippet, I built a simple if statement to test for blog posts, and if not, to render the\_title() minus any extra text.

\[php\] // First test for the post type(s) <?php global $post if (get\_post\_type($post) == 'post\_type\_1') || get\_post\_type($post) == 'post\_type\_2') { ?> // IF either test registers true, then set the $before parameter in this format: the\_title($before, $after); <h1><a href="<?php the\_permalink(); ?>"><?php the\_title('BLOG: ', ''); ?></a></h1> // IF not, then display as normal <?php } else { ?> <h1><a href="<?php the\_permalink(); ?>"><?php the\_title(); ?></a></h1> // Close the IF statement <?php } ?> \[/php\]

Using this example, posts that register as true would display like this:

**BLOG: The post title**
