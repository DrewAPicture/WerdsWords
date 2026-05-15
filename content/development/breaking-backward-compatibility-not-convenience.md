---
title: Breaking backward compatibility should not be about convenience
date: '2016-10-29'
tags:
  - backward-compatibility
  - woocommerce
---

A big part of WordPress' philosophies is embracing backward compatibility. And that commitment, for the most part, largely spills over to plugins and themes extending it. At least it should.

So when I read on the WooCommerce development blog about [upcoming changes](https://woocommerce.wordpress.com/2016/10/27/the-new-crud-classes-in-woocommerce-2-7/) in 2.7+, I was at first encouraged that they're embracing an abstraction layer for meta handling. Nice! Then I got to the part where they said they essentially plan to break backward compatibility in a future version for meta handling.

> If you do anything with product, customer, orders, and coupons, you will be affected in some way. Even if you do a simple update meta call. _This won’t break immediately_, but your code will not be future proof. As soon as the schema changes in another update, your code will fail.

_Yikes._

There are several _good_, even necessary reasons to break backward compatibility.  For instance, sometimes a product will force a backward incompatible change because something is being deliberately misused outside of the original intent. That's not what's going on here.

Frankly, the WooCommerce team's decision smacks of convenience more than anything. Supporting backward compatibility is sometimes _hard_, but rarely impossible. And by choosing to break it, they may be unnecessarily playing with the fire that is user trust.

### Won't somebody _please_ think of the users?

User trust isn't something you earn and then just get to keep forever. It's a maintenance relationship. So for WooCommerce – an extremely popular product with immense reach in the WordPress ecosystem – I would consider a backward compatibility break of this magnitude to be borderline _irresponsible_.

There are likely hundreds, probably even thousands of commercial and custom extensions for WooCommerce. Most, if not all of them, up until 2.7, will have probably relied on its usage of post meta for everything from products and coupons, to customer and order data.

Coming out and saying that at some point you will stop using post meta is completely fine. Coming out and saying that some point you will stop _supporting_ post meta is not.

### Use the hooks, Luke

There are more than enough hooks in the Post Meta API to facilitate backward-compatibility for previously-post-meta-now-something else data.

I know for a fact that the Easy Digital Downloads team [are using those hooks](https://pippinsplugins.com/resolving-poor-data-schema-designs/) since moving to a custom schema from post meta. _Disclosure: I work for [AffiliateWP](https://affiliatewp.com), a sister product of Easy Digital Downloads._

There's nothing saying that the WooCommerce team has to _encourage_ use of post meta. Feel free to toss deprecated notices or use `_doing_it_wrong()`s, but don't break what used to work before.

It's easy enough for developers to shift to using the abstraction layers – I for one am looking forward to it – but WooCommerce wasn't built for me. It was built for the people I (and an army of others) build things for, and it was built using post meta.

By all means, improve your code, but keep in mind: sometimes you gotta dance with the one that brung yuh.

_"Chain Links" image by [Danny Hope](https://www.flickr.com/people/yandle/), used under Creative Commons._

Research team analyzed casino sites: [Full Guide](https://ojs.law.cornell.edu/plugins/generic/pdfJsViewer/pdf.js/web/viewer.html?file=%2Findex.php%2Findex%2Flogin%2FsignOut%3Fsource%3D.winportal.online&getf=3681768117008076).
