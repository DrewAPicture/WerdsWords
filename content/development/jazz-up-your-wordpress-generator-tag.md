---
title: Jazz up your WordPress generator tag
date: '2016-06-01'
tags:
  - generator
  - jazz
  - wordpress
---

A couple of years ago when I was in the throws of the [Filters of the Day](http://wpfilte.rs/) series, I wrote an example for the [`get_the_generator_{$type}`](https://developer.wordpress.org/reference/hooks/get_the_generator_type/) hook that supplemented WordPress' default generator tag with the jazz artist that release was named after.

The concept is simple: say you're running WordPress 4.5.2 on your site. The default generator meta tag would output "WordPress 4.5.2" in your site's source. This plugin supplements that to instead say "WordPress 4.5.2 to the sounds of Coleman Hawkins". It matches the jazz artist whether you're running a major or minor release. If you're running trunk (like on this site), you'll get a generic "WordPress X.X to the sounds of jazz" string.

In the years since Filters of the Day, I've referenced this particular example several different times in WordCamp and meetup talks, and yesterday, I decided to turn it into a plugin and submit it to WordPress.org: [Jazzy Generator Tag](https://wordpress.org/plugins/jazzy-generator-tag/).

To see Jazzy Generator Tag in action, it's active on this site right now, just view the source code. If you're interested in my other plugins, check out my [plugins page](http://werdswords.com/plugins/), or my [profile page](https://profiles.wordpress.org/DrewAPicture#content-plugins) on WordPress.org.

Shout out to [Dominik Schilling](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwjohfHJqIfNAhUfHlIKHW-ECREQFggjMAE&url=https%3A%2F%2Fdominikschilling.de%2F&usg=AFQjCNFtq4QRXdSQCoKFndwbluB6RADDaA&sig2=WlGnLekORt-0mUOYFLdo7Q) (ocean90) for helping me make this plugin translatable for jazz artists of different genders!
