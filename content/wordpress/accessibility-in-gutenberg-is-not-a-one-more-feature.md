---
title: Accessibility in Gutenberg is not a one-more feature
date: '2018-10-29'
tags:
  - accessibility
  - gutenberg
  - usability
---

Joe Dolson, one of the WordPress Accessibility team reps posted a [letter](https://make.wordpress.org/accessibility/2018/10/29/report-on-the-accessibility-status-of-gutenberg/) on make/accessibility this afternoon that really struck a chord with me. In detail, the letter outlines the Accessibility team's perceived shortcomings of Gutenberg. the new block editor set to ship in a few weeks with WordPress 5.0. 

In reading the letter, I was struck by a key theme that Joe so eloquently expresses: making something technically _accessible_ doesn't automatically make it a good experience for the users it serves to assist.

He went on to detail several issues, but the one that really stuck out to me had to do with using keyboard navigation to access a block's settings to change the font size of some selected text (emphasis his):

> 1\. Press `` Ctrl + ` `` **four** times to locate the block settings.
> 
> 2\. Press `tab` **five** times to reach the font size selector. Discover the usage of the non-standard selector dropdown (normal selector: arrow key down to desired value, press enter to select, tab through rest of document. This selector: `Enter`  to expand dropdown, `tab` key to choose desired value, `Enter` to select that value, `esc` key **twice** to exit selector.)
> 
> 3\. Press `tab` **six** times to locate skip link back to selected block.
> 
> 4\. Press `Enter`  to activate the selected block.
> 
> 5\. Press `tab` **thirteen** times to reach the editable text of the block.
> 
> The above navigation scheme required 34 separate keyboard stops in order to change the font size of the selected text and return to the previous position, and is aided in efficiency by the tester’s prior knowledge of how to navigate the process. (Tested in Chrome and in Firefox using [NVDA](https://www.nvaccess.org/).)
> 
> We want to be clear that the above example is not comparable to the options available in the classic editor – there is no mechanism for increasing the font size of a paragraph in the existing editor.
> 
> Joe Dolson, [Report on the Accessibility Status of Gutenberg](https://make.wordpress.org/accessibility/2018/10/29/report-on-the-accessibility-status-of-gutenberg/)

Even with the final concession that there is no comparable feature for changing the font size of a paragraph in the classic editor, I'm not sure this is considered an improvement. Maybe for users who don't have to do it with a keyboard? Yikes.

As a core developer, I'll admit that I've been relatively silent on Gutenberg and the 5.0 release until now.  

I don't hate Gutenberg. In fact, the _idea_ of Gutenberg is awesome, even inspiring. This post was written using Gutenberg. It represents the opportunity for a giant leap forward for content authoring in WordPress, and frankly I don't think anybody really disagrees with that assertion when it's just an idea.

When Gutenberg becomes more than an idea, however, when it's real and out there in world, that means something to a lot of people who look to WordPress to set the example. It sends a powerful message to 32% of the web: "this is the new standard."

Please let's not make the "new standard" be that we're willing to ship technically accessible but perhaps not entirely usable-for-all features; let's not define it as one that sacrifices standards core to the WordPress experience in the name of perceived expediency; let's not define it as the new default authoring experience for all users when not all users can use it well.

The [WordPress philosophy](https://wordpress.org/about/philosophy/) states deadlines are not arbitrary. That's fair, that's something we live by. Core standards are not arbitrary either, and accessibility is a not a one-more feature.
