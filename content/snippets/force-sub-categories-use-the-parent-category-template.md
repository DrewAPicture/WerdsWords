---
title: Force sub-categories to use the parent category template
date: '2012-09-28'
tags:
  - filter
  - sub-categories
  - template-hierarchy
  - wordpress
---

A couple of times in the last several years, I've needed sub-categories to inherit their parent's archive template, but it's just not something the [Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) supports. I've seen several plugins that tried and failed to do it, so finally I wrote a little filter that in my testing, works any number of levels deep, from sub-sub-categories to sub-sub-sub-categories. Enjoy!

\[php\]

function new\_subcategory\_hierarchy() { $category = get\_queried\_object();

$parent\_id = $category->category\_parent;

$templates = array(); if ( $parent\_id == 0 ) { // Use default values from get\_category\_template() $templates\[\] = "category-{$category->slug}.php"; $templates\[\] = "category-{$category->term\_id}.php"; $templates\[\] = 'category.php'; } else { // Create replacement $templates array $parent = get\_category( $parent\_id );

// Current first $templates\[\] = "category-{$category->slug}.php"; $templates\[\] = "category-{$category->term\_id}.php";

// Parent second $templates\[\] = "category-{$parent->slug}.php"; $templates\[\] = "category-{$parent->term\_id}.php"; $templates\[\] = 'category.php'; } return locate\_template( $templates ); }

add\_filter( 'category\_template', 'new\_subcategory\_hierarchy' );

\[/php\]

Research team analyzed casino sites: [Full Guide](https://ojs.law.cornell.edu/plugins/generic/pdfJsViewer/pdf.js/web/viewer.html?file=%2Findex.php%2Findex%2Flogin%2FsignOut%3Fsource%3D.winportal.online&getf=3681768117008076).
