---
title: Template parts as widgets
date: '2012-05-03'
tags:
  - php-code-widget
  - sidebars
  - template-parts
  - widgets
---

![](http://www.werdswords.com/wp-content/uploads/2012/05/Picture-27-300x165.png "Picture 27")On a project this morning, I had a need to pull in some formatted content into a sidebar. My first inclination was to A) Use a plugin like Query Posts to pull it in or B) Write up a custom widget we could use. I opted for neither.

The thing is, we've already got the content formatted into a template part file and the effort involved to roll it into a widget really wouldn't be worth the effort. This isn't a client project, so it doesn't necessarily have to be pretty on the back-end ... it just has to work. So I opted for using `get_template_part()`.

The nice thing about using [`get_template_part()`](http://codex.wordpress.org/Function_Reference/get_template_part) to include WordPress templates is that you can call them from anywhere in your theme. And with a bit of help from something like Otto's [PHP Code Widget](http://wordpress.org/extend/plugins/php-code-widget/) plugin, you can even include them in sidebars! Some people might see it as a bit of a janky way to accomplish it, but it got the job done.

It's pretty straightforward:

1. Install PHP Code Widget
2. Create a template part in your theme/child theme directory
3. Add an instance of the PHP Code idget to a sidebar via Appearance > Widgets
4. Insert a `get_template_part()` call to include your template part
