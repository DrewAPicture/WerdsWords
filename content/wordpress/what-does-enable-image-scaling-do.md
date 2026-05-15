---
title: What does the Enable Image Scaling plugin <em>do?</em>
date: '2012-12-20'
tags:
  - image-scaling
  - images
  - media
  - plugin
---

A lot of people have contacted me in the last year about my [Enable Image Scaling](http://wordpress.org/extend/plugins/enable-image-scaling-option-on-upload/) plugin to ask me what exactly it _does_.

It's a valid question, mostly because many people don't understand the distinction between **scaling** and **cropping**. Put simply, scaling is like resizing. The plugin resizes — or scales-down — your image(s) on upload.

So _why_ would you want to do that? **Smaller images make for faster websites.**

I've worked up a little example to try demonstrating the benefits of scaling down images on your WordPress site.

![Image scaling comparison](/images/what-does-enable-image-scaling-do/enable_image_scaling_stats.png)

Let's say you have an image, we'll call it bakery.jpg. You've just downloaded it off of your camera and it has the following stats:

- **Dimensions:** 3184 x 2120 pixels
- **File size:** : 5.1 MB

By most accounts, that's a pretty big image. And that's about par for the course when it comes to modern digital cameras.

And let's say that in the last year, conservatively, you've uploaded 100 images to your photo blog or whatever. That's roughly 500 MB of images.

Now let's say you decided to scale all uploaded photos to have a max width or height of 1000px. When scaled down from 3184px to 1000px width, the image now has the following stats:

- **Dimensions:** 1000 x 666 pixels
- **File size:** 790 KB

If you had scaled down all 100 images on your photo blog to 1000px width, they would now have a cumulative file size of roughly 80 MB, which is **an 80 percent decrease**.

Year over year, stored images can really start to add up and it doesn't make a lot of sense to store huge, original images on a server if they can't be viewed to their full potential anyway. Enable Image Scaling can help you keep things sensible.
