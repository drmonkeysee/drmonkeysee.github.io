Title: Pelican blog publishing
Category: blog
Tags: pelican, blogging
Summary: Publishing a blog with Pelican
Date: 2015-12-15

I've got a newly minted Pelican site but I haven't produced anything yet. To find out how that happened go read [this post]({filename}/setup-pelican-blog.markdown). Now what? Well I'm not going to detail exactly how I've carefully crafted every blog post because who cares?? You do you. I *will* point out some notable considerations that went into putting the blog together.

## Files Files Files

Pelican generated a bunch of files and folders. Here's a quick overview:

- **Makefile**/**fabfile.py** and **develop\_server.sh**: automation scripts for local hosting, publishing, and site generation
- **pelicanconf.py** and **publishconf.py**: configuration files for Pelican
- **content/**: content folder is where all blog posts go; subfolders can contain special content like images, about pages, pdfs, tax forms, whatever
- **output/**: Pelican's output folder, everything it generates automatically goes in here which is why we added it to the .gitignore file last time

When Pelican builds the site it combines everything in **content/** with the settings defined in the **.py** files, along with any themes and plugins, and spits out static site files to **output/**.

## Get It Running!

Before I can figure out what I want I need to find out what I have. Instead of fiddling with configuration let's get something running. Reading over the documentation I know that all content files have metadata that tells Pelican various things about how the file should be generated so using an example from [eevee's blog source](https://github.com/eevee/eev.ee) I slap together a simple **content/hello-world.markdown** file:

```
Title: Hello World
Category: blog
Tags: pelican, blogging
Summary: Obligatory hello world post
Date: 2015-12-04

test test test
```

I don't recall exactly what I put in there but close enough. Now that I have something to look at in a browser I can use the handy **Makefile**. `make help` lists all the commands but the one we care about is `make devserver`. This does several things:

1. Compile the site into **output/**
2. Launch a local webserver on localhost:8000
3. Monitor changes to content and configuration files and regenerate the site

Well, three things. Now I can work entirely in the text editor and immediately see changes in a browser every time I save. To stop it we can run `make stopserver`. Time to start futzing with settings.

## Configuration

**pelicanconf.py** is your friend. It tells Pelican all kinds of things about how to organize and build the HTML and I spent quite a bit of time in here before writing anything approaching a publishable post. This file was built from the answers to **pelican-quickstart** so there shouldn't be many surprises. A lot of the information in here informs the theme engine so what Pelican does with it depends on the specifics of the templates.

I fill out various social network fields including GitHub, Twitter, and Email because I guess I like spam. I turn `RELATIVE_URLS` on for local development and move the `SITEURL` field from **publishconf.py** so it's available during development. **publishconf.py** overrides **pelicanconf.py** settings for the publish action and other than that one change it's fine as is.

### Metadata

Pelican reads a bunch of metadata fields from the top of a blog file to determine various things like title, publish date, tags, etc (see example above). Looking at various examples out there I find that most authors are putting dates explicitly in the metadata but that seems awfully fussy. What if I forget to change the date when I actually publish? Or I fat finger it?

Fortunately setting `DEFAULT_DATE = 'fs'` tells Pelican to figure out publish date from the file system. Most of the time this is what I want and if not I can override in the file directly. Problem solved. (UPDATE: but wait, [there's more]({filename}/blog-config-revisited.markdown)!)

The slug, by default, comes from the title but sometimes I may want a fancier title than I want in the url. Setting `SLUGIFY_SOURCE = 'basename'` pulls the slug from the name of the file *sans* extension. Alright. Looks good.

Blog entries should be considered drafts until I'm ready to publish. There's another field `Status: draft` that is awfully handy. The documentation claims that this field can be set in **pelicanconf.py** to set the default to draft (via `DEFAULT_METADATA`) but I found it to be really flaky. Sometimes it would make all files drafts, sometimes all files would be published, and sometimes it would do what the file metadata said. It would rotate between these outcomes randomly every time I generated the site, so I abandoned that setting and will have to mark every entry as a draft manually. Oh well.

That's mostly it for metadata and general settings. But there's one final detail.

### Urls

Url structure is important. It's a user-facing feature, in the parlance of product management. Ugly urls are easy enough to come by these days but any site that's designed for *reading* looks a lot nicer if the address bar reflects what it is you're looking at.

Pelican has a whole slew of settings for generating urls for different parts of the site but the most relevant one here is `ARTICLE_URL`. There's a mini-language to construct url templates that will then dictate the file names and folder structure of the published site. I think by default the title is used as the slug so a blog entry titled "Hello World" will generate a url like `/hello-world.html`.

Common fashion these days says that's enough (except the .html extension which we'll get to). The competing format most often seen is including the date in the url. I went back and forth on this quite a bit. Title alone was tempting as it looks so clean. Ultimately I decided to go with date in the url because none of these blog entries really stand alone like they would on, say, [Medium](https://medium.com/top-stories). When an entry appears in time is important to understanding the site. So dated urls it is.

However those pesky file extensions are really passé. Pelican makes a distinction between the url and the file it writes to disk. Since most web servers have the notion of a default page for a folder we can use that trick to create extensionless urls with static files. The key is simply to set the `ARTICLE_URL` field as `{url-template}` and `ARTICLE_SAVE_AS` field as `{url-template}/index.html`.

The index file will be treated as the default content and the url will simply reflect the name of the folder. Thus a file **hello-world.markdown** will be written to **hello-world/index.html** which will look like `/hello-world` in the browser (technically `/hello-world/index.html` will also work in the browser but Pelican will generate links to the former). We can do that for all the other `*URL` and `*SAVE_AS` fields for consistency across the site. Fancy!

Put it all together and the article url settings are:

```python
ARTICLE_URL = '{category}/{date:%Y}/{date:%m}/{date:%d}/{slug}'
ARTICLE_SAVE_AS = '{category}/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'
```

I included category as well so the full link includes the "blog" subfolder in case I have other groups of content in the future.

Finally I blank out the `AUTHOR` fields since there's no need to generate those pages. I'm not hiring contributors!

## Publishing

I've got a blog post. I've set various configuration settings. Let's do this thing.

The Makefile Pelican created includes a `github` target that does... everything. Once a blog post is ready to go I run `make github` and it all magically happens. To be more specific it:

1. Deletes the **output/** folder
2. Generates new HTML into the **output/** folder
3. Uses the ghp-import package to copy the **output/** folder into the root folder of the `master` branch
4. Push `master` to origin on GitHub

Boom! Done! Our active development branch will remain `source`, ghp-import wholly owns `master` now, and never the two shall meet.

## In Summation

Everything's set up and now the workflow is very simple: create new blog post files in **content/**, unmark them as drafts when they're ready to publish, and run `make github` to get them out to the world. That's pretty much it. Static sites are awesome!

I do have a few things left before I consider this blog ready:

- come up with a custom theme
- clarify licenses for the software and site content
- slap google analytics on the site 'cuz why not
- add non-blog pages like about me or whatever who knows
- the devserver is fond of reminding me I have no favicon yet

I've just touched on some notable points of my experience getting this blog up and running; Pelican itself has [extensive documentation](http://docs.getpelican.com/en/3.6.3/index.html) if you need more detail. Additionally there's a whole galaxy of themes and plugins I haven't mentioned at all. All of this code is up on [my GitHub account](https://github.com/drmonkeysee/drmonkeysee.github.io/tree/source) if you need specifics on how I've configured the site or structured the post files. Any questions not otherwise answered? Hit me up on [Twitter](https://twitter.com/drmonkeysee)!
