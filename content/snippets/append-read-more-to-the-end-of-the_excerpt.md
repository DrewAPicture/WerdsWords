---
title: Append 'Read More' to the end of the_excerpt()
date: '2011-07-06'
tags:
  - the_excerpt
---

![](http://www.werdswords.com/wp-content/uploads/2011/07/readmore_excerpt.png "readmore_excerpt")

This snippet, when added to your theme's functions.php file, will allow you to append '... Read More' or any other text to the end of your excerpts. Creates a more streamlined look.

\[php\]<br /> function excerpt\_readmore($more) {<br /> return '... &lt;a href=&quot;'. get\_permalink($post-&gt;ID) . '&quot; class=&quot;readmore&quot;&gt;' . 'Read More' . '&lt;/a&gt;';<br /> }<br /> add\_filter('excerpt\_more', 'excerpt\_readmore');<br /> \[/php\]

Source: [WPSnipp.com](http://wpsnipp.com/index.php/excerpt/add-read-more-permalink-to-the-end-of-the-excerpt/)
