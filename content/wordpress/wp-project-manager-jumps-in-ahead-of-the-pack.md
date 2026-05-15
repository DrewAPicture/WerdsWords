---
title: WP Project Manager jumps in ahead of the pack
date: '2012-12-05'
tags:
  - basecamp
  - plugin
  - project-management
---

**WP Project Manager is [Basecamp](http://www.basecamp.com) for WordPress**. There, I said it. But more than that, it's a complete project management solution and it's open source!

The plugin was written by [Tareq Hasan](http://tareq.wedevs.com/), who says he worked on it for 5 months leading up to the beta launch on November 25.

If you're like me and you work in WordPress, you're always keeping an eye out for good quality plugins that do what you want and do it well. This plugin does project management as well as Basecamp in many respects and it's still in _beta_!<!--more-->

If you're just here for the highlights and the download links, the next part is for you.

In short, WP Project Manager allows you to:

- Create and manage an unlimited number of projects
- Include existing WordPress users as collaborators
- Post project messages
- Create task lists
- Add and assign to-dos to collaborators
- Setup project milestones with attached task lists
- Comment on messages and to-dos
- Upload and organize project files as part of the overall workflow
- Do everything above from within the WordPress Dashboard, for free!

Download it: [**from GitHub**](https://github.com/tareq1988/wp-project-manager) | from the [**WP plugin repository**](http://wordpress.org/extend/plugins/wedevs-project-manager/)

For those of you interested in some of the nitty gritty, let's dig in.

It's true that parts of this plugin's UI look strikingly similar to Basecamp, but setting the design-originality debate aside, I think you have to ask, "Why mess with a good thing?"

If you take a peek under the hood, there are tons of hooks in use and likely a lot of possibility for extending its functionality. It also uses a slew of custom post types, which means it's not going to add the bloat of extra tables to your database.

I have to say that after only using the plugin for a couple of minutes, I was pretty excited. Most of the time when you're testing a plugin that's in beta, you can expect to see obvious bugs, incomplete features and general roughness around the edges – all things this plugin mostly lacks.

Lets go through some of the screens and options and you can form your own opinion.

**Project Manager**

![The Project Manager screen](http://werdswords.com/wp-content/uploads/2012/12/main.png "main")

If you're a current or former Basecamp user, the Project Manager screen should look familiar, since it looks as if it was literally plucked from Basecamp and inserted verbatim into the WordPress Dashboard.

From this screen, adding new projects is trivial. Clicking the 'New Project' button loads a modal where you enter the new project name, some details, you can choose collaborators from existing WordPress users and even notify them the project was created.

Each project is listed on this main screen and provides useful information such as the number of project messages, to-do lists, to-dos, comments, files and more.

Clicking through into a project page presents you with a myriad of option screens organized into tabs. We'll go through them one by one.

**Project Manager Tabs – Overview**

**Activity** — When a project page first loads, you land on the Activity tab. This screen shows an activity log of all the recent actions made by you or your project collaborators. The log doesn't update in real-time but it provides a fairly comprehensive guide to what's new with your project.

[![The project activity screen](http://werdswords.com/wp-content/uploads/2012/12/activity-600x258.png "activity")](http://werdswords.com/wp-content/uploads/2012/12/activity.png)

Something I'd like to see added to this is a "What's new since I last visited" filter.

**Messages** — Messages are the first of several sub-parts to any given project in wP Project Manager. They provide a simple interface for collaborators to communicate.

[![The project messages screen](http://werdswords.com/wp-content/uploads/2012/12/messages-600x172.png "messages")](http://werdswords.com/wp-content/uploads/2012/12/messages.png)

Adding new messages, you can set a title, write a description, attach files such as mockups or needed documents, assign a milestone (more on that later) and notify other collaborators. Once a message is posted, you can comment on it and even attach files to your comments!

One aspect I think could certainly use improvement is the 'Description' field, however. I expected at least simple formatting tools, at most the built-in WordPress WYSIWYG editor. The same would go for message commenting.

**Task Lists** — No project management solution is complete without task management, and this plugin doesn't disappoint.

[![The project task lists](http://werdswords.com/wp-content/uploads/2012/12/task_list-600x131.png "task_list")](http://werdswords.com/wp-content/uploads/2012/12/task_list.png)

Users have the ability to create multiple task lists, each with their own assigned to-do items. Adding a new task list, you can set a title, provide a brief description and assign a project milestone.

[![Adding a new to-do](http://werdswords.com/wp-content/uploads/2012/12/new-todo-300x279.png "new-todo")](http://werdswords.com/wp-content/uploads/2012/12/new-todo.png)Adding new to-dos is straightforward and logical: Write the task, choose the completion date with the date picker and assign it to user. You can also comment on to-dos and again, attach files, which is awesome.

There is one feature on this screen that absolutely love and two others that I think are starkly missing.

The first is that there's a completion bar for every task list that live-updates when you check off to-dos, which is very slick! On the other hand, two features I'd like to see added in the future:

1. The ability to re-order to-dos
2. Ability to assign times as well as dates for to-dos.

Another nitpick is that when you've clicked through to a specific task list, the 'Add New Task List' button disappears forcing you to re-click the To-do List tab to return to the screen home. This is also true on the messages screen.

**Milestones** — When you're setting to-dos and writing messages there's always that nagging need to make sure you're working toward common goals. Creating and assigning milestones effectively allows you to set a completion date for an entire task list.

[![The project milestones screen](http://werdswords.com/wp-content/uploads/2012/12/milestones-600x195.png "milestones")](http://werdswords.com/wp-content/uploads/2012/12/milestones.png)

Each milestone has a title, description and completion date and can be assigned to messages and task lists. Milestones on this screen are ordered chronologically and can be manually marked complete. It would be nice to see a completion bar comparable to the one on task lists screen here.

I would just mention again that I think the ability to set times _as well as dates_ should be on this plugin's roadmap.

**Files** — [![The project files screen](http://werdswords.com/wp-content/uploads/2012/12/files-300x199.png "files")](http://werdswords.com/wp-content/uploads/2012/12/files.png)The final tab in this screen is the Files tab. It is less about action and more about organization. You don't add files on this screen, you view files uploaded on the other screens such as those attached to messages or comments.

One nitpick I have with this and other screens that have attachments on them is that when you click on images for instance, you're taken to the file URL. It would be so much more polished to load media in a lightbox, modal or similar.

**Brass tacks**

**The good:** _The UI has panache and it's easy to use_ — Hasan made an effort to cover his bases when it came to usability on the various screens. For most actions including commenting and uploads, there are accompanying ajax affects that provide for a nice user experience. Screens slide open, helpful messages appear on submit, media uploads are accompanied by a progress bar and instant preview, the completion bar on the to-dos screen live-updates when to-dos are checked off, the list goes on.

_Most of what you'd expect to be there, is there_ — Activity tracking, task lists and to-dos, messages, milestones, and baked-in collaboration tools all make WP Project Manager competitive. Not only are you mostly getting the features you'd expect, but you also get it for free.

_It's easy to find_ — Probably one of my biggest pet peeves is when you've just installed a plugin and have to hunt around to find its option pages. WP Project Manager creates a single, top-level menu and places it front and center below the Dashboard menu. There are no options pages tucked into Settings, no cryptic submenu items under Tools, just a single clearinghouse for everything the plugin has to offer. Simple is better.

**Room for improvement:**

_Adding a new \_\_\_\_ isn't possible from certain screens_ — By not taking advantage of the admin submenus, I think Hasan has made a significant faux pas.

By now, users are used to (and frankly expect) submenus or flyouts and when you don't have them, it feels a bit incomplete. On top of that, many times if you're in the detailed view of one of the options tabs, most of the time the Add new \_\_\_\_ button is gone. This can get frustrating because you're suddenly having to do multiple steps for what should be a seamless workflow.

_Built-in editors are nowhere to be found_ — Within messages, comments and milestones, it's a bit disappointing not to see Hasan utilizing the built-in WordPress editors. You're excluding a certain level of user by simplifying down to textarea inputs in these areas. Also, it's unclear whether any form of formatting is allowed in the various commenting screens.

_In-code comments are few and far between_ — In a plugin with level of complexity, I'd expect a bit more 'under-the-hood' documentation for developers looking to dive in and extend the plugin. This should be on the roadmap if it isn't already.

**Wrap up**

Overall, I think WP Project Manager is a fantastic first effort. I look forward to seeing future iterations and using it in future projects.

Have you tried this plugin, and if so, what did you think? Is there anything missing?
