---
title: 'Filters, not options: Download Shortcode 1.0'
date: '2013-01-01'
tags:
  - filters
  - options
  - plugin-development
  - settings
---

In rewriting one of my plugins recently, I decided to try an experiment I like to call **Filters, not options** (a play on the oft-repeated WordPress mantra of [Decisions, not options](http://wordpress.org/about/philosophy/)).

I think whenever you conceive a plugin, you're aware that it has an express purpose and is meant to be used in a specific way. That purpose should be your guiding light.

The plugin, in case you're wondering, is the recently-released 1.0 update of my [Download Shortcode](http://wordpress.org/extend/plugins/download-shortcode/) plugin, which allows users to output force-download links for files via a shortcode.

Out of the box, the Download Shortcode only supports files that live in the uploads directory. If you don't have 'pretty permalinks' enabled on your site, the full URL including the download-script endpoint are exposed. If you _do_ have 'pretty permalinks' enabled, the URLs will be rewritten to mask the endpoint, which is better for security. And none of this requires configuration outside of the normal WordPress site setup. Easy.

### OK, so what if I wanna change it up?

Use the filters supplied in the readme. If you're a developer or adventurous user, the examples should be more than enough of primer to get you started.

Example filters include:

- Ability to change the rewrite endpoint
- Change the supported directory
- Disable rewrites regardless of 'pretty permalink' usage
- Hiding the shortcodes after the plugin is deactivated or removed

## Why do it this way?

Simple, it's all about the 80/20 rule. 80 percent of this plugin's users expect it to work in a very specific way. The remaining 20 percent might want to fudge with things a bit to fit their needs and that's fine, but I'm inclined to cater to the majority.

Inevitably, this begets the discussion of whether filters can serve equally as well as options. I think they can and I'd go even further to say that I don't think that extra options suit every plugin. Returning for a moment to the 80/20 rule, if 80 percent of your users won't need the options, adding them is unnecessary overhead. It's supposed to do a thing and it does it. If you want more out of it, you can use the filters or fork it and modify it however you want. The beauty of open aource.

Is this a perversion of the spirit of using filters in plugins? Is this even a good idea? I'm curious to hear from other plugin authors and welcome the feedback.
