---
title: Query based on whether posts have a featured image
date: '2012-06-23'
tags:
  - post-thumbnail
  - posts
  - query
  - wp_query
---

Ever need to query for posts based whether they have a post thumbnail? This can be accomplished by adding `'meta_key' => '_thumbnail_id'` to the query args:

\[php\] <?php $args = array( 'posts\_per\_page' => 1, 'meta\_key' => '\_thumbnail\_id' ); $my\_query = new WP\_Query( $args );

if ( $my\_query->have\_posts() ) : while ( $my\_query->have\_posts() ) : $my\_query->the\_post(); ... \[/php\]
