---
title: 5 lesser-known improvements in WordPress 4.6
date: '2016-08-19'
tags:
  - 4-6
  - dashicons
  - deprecated-hooks
  - embeds
  - pepper-adams
  - plugins
---

WordPress 4.6, "Pepper" was [released](https://wordpress.org/news/2016/08/pepper/) earlier this week to what has been by all accounts a pretty great reception. Notable features and improvements in 4.6 include Shiny Updates v2™, native fonts in the admin, editor improvements, and a whole host of developer goodies.

And as with any major release of WordPress, there are always features and improvements made that get overlooked. Here's five little-known features, fixes, and improvements you may not know about in WordPress 4.6.

## 1\. A modernized Import screen

![Before and after (WordPress 4.6) screenshots of the Import screen](/images/5-lesser-known-changes-wordpress-4-6/46_import.png)

What [began](https://core.trac.wordpress.org/ticket/35191) as an effort to remove `title` attributes for accessibility reasons eventually turned into a significant usability refresh of the Import screen.

Easily the biggest change was making this screen feel more like a place to _manage_ and _launch_ importers as separate actions. Each importer now has row actions to install and run, as well as a "Details" link that opens the plugin information popup just like with regular plugins.

As a bonus, importers can also now be installed in-line similarly to how shiny updates allows for in-line updates of plugins and themes. Click "Install" and it happens in place. Smart!

Finally, 4.6 also introduces help text to this screen. Overall, big – yet incremental – usability changes to a not oft-used screen. And of course, it's now more accessible!

## 2\. Network Admin and the Sites menu got a better icon

![Before and after (WordPress 4.6) screenshots of the Sites menu icon in the Network Admin](/images/5-lesser-known-changes-wordpress-4-6/46_dashicon.png)

In a relatively minor change, a new dashicon was [introduced](https://core.trac.wordpress.org/ticket/36754) for the Network Admin toolbar item, as well as the Network Admin > Sites menu. Big improvement over the old ambiguous key icon.

## 3\. Embed previews when inserting from a URL were fixed

![Screenshot of the Insert From URL workflow in the media modal in WordPress 4.6](/images/5-lesser-known-changes-wordpress-4-6/46_embeds.png)

With the advent of embeddable WordPress content [starting in 4.4](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjbxvLtl87OAhVQx2MKHY_WCx0QFggeMAA&url=https%3A%2F%2Fmake.wordpress.org%2Fcore%2F2015%2F10%2F28%2Fnew-embeds-feature-in-wordpress-4-4%2F&usg=AFQjCNFwUcEo0OgKBAqGlvyDQGidVdFicw), came the ability to embed that content via the Insert from URL workflow in the media modal. At some point, the preview mechanism was broken; this has been [fixed](https://core.trac.wordpress.org/ticket/37334) in 4.6. Love this feature.

## 4\. Upload and install plugins from the same screen

![Add plugins drop-down panel in Add Plugins in WordPress 4.6](/images/5-lesser-known-changes-wordpress-4-6/46_plugins.png)

A core tenet of the Shiny Updates v2™ feature in WordPress 4.6 was to increase the efficiency of installing and updating plugins and themes.

One lesser-known way this was achieved was by [integrating](https://core.trac.wordpress.org/ticket/35429) the plugin upload form into the main Add Plugins screen. The old way redirected users to a completely separate page.

If you're wondering why that sounds familiar, it already worked this way in Add Themes. Regardless, nice to see incremental usability improvements like this.

## 5\. Actions and filters can now be properly deprecated

One code change that really didn't get a lot of play in feature announcements was that [deprecating hooks](https://core.trac.wordpress.org/ticket/10441) is now possible in core. Add-on developers may now collectively rejoice!

No core hooks were deprecated in 4.6, but that shouldn't stop plugin and theme developers from using it right away,

Two new global functions were added, `[do_action_deprecated()](https://developer.wordpress.org/reference/functions/do_action_deprecated/)` and `[apply_filters_deprecated()](https://developer.wordpress.org/reference/functions/apply_filters_deprecated/)`, along with the private helper they both use: `[_deprecated_hook()](https://developer.wordpress.org/reference/functions/_deprecated_hook/)`. All in all, deprecating hooks is pretty straightforward:

Old action call:

\[php\] /\*\* \* Fires when writing Codex articles. \* \* @since 0.71 \* \* @param bool $codex Whether to write Codex articles. Default false. \* @param bool $devhub Whether to write DevHub articles. Default true. do\_action( 'write\_codex\_articles', $codex, $devhub ); \[/php\]

Deprecated action call:

\[php\] /\*\* \* Fires when writing Codex articles. \* \* @since 0.71 \* @deprecated 3.7.0 \* @see 'write\_devhub\_articles' \*/ do\_action\_deprecated( 'write\_codex\_articles', array( $codex, $devhub ), '3.7.0', 'write\_devhub\_articles', 'woohoo!' ); \[/php\]

Boom.

* * *

Hope you've enjoyed this post. Are there any other lesser-known improvements in WordPress 4.6 that tickled your fancy? Share them in the comments!
