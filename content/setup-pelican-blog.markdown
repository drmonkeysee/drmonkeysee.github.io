Title: Pelican blog setup
Category: blog
Tags: pelican, blogging
Summary: Setting up a blog with Pelican
Status: draft

# Outline

- set up github page repo
- install pelican and run quickstart
- helpful blog posts
- run through settings
	- url structure
	- author name
	- date generation and other defaults
	- issue with default metadata
	- timezone
- themes
- plugins
- license

I followed a [couple](http://mathamy.com/migrating-to-github-pages-using-pelican.html) [handy](http://ntanjerome.org/blog/how-to-setup-github-user-page-with-pelican/) [guides](https://fedoramagazine.org/make-github-pages-blog-with-pelican/) on setting up this blog. I encourage everyone to go check them out, but I found they were slightly out of date with the latest version of Pelican so I'm documenting my own setup process here so it may also some day be a handy guide.

## Create a GitHub Pages repository

I'm hosting the blog on GitHub pages which provides a real convenient location to serve a static site. The emphasis is on *static* site; there is no server-side framework so your site must be made up of HTML, CSS, and JavaScript files. Hence the need for a static site generator like [Jekyll](http://jekyllrb.com) (which GitHub Pages recommends) or [Pelican](http://docs.getpelican.com/en/3.6.3/) (because I like Python better than Ruby).

The first step is to actually have a GitHub account. If you don't, Pelican supports hosting on several other platforms but I won't be talking about those here.

If you have a [GitHub](https://github.com) account then head over to the [GitHub Pages documentation](https://pages.github.com) to figure out what git repository you need to create to host your site. In my case I'm hosting a "User or organization site" instead of a "Project site" so the name of my repo is `drmonkeysee.github.io`.

Once you have the repository created you can follow the basic instructions to get something up and running. Note your site will be hosted from the **master** branch. We'll use that to our benefit once Pelican enters the scene.

## Does the Hosting work?

Now we're going to create a real simple test page to make sure everything is working. First clone the repository locally to start working on it:

```sh
$ git clone git@github.com:drmonkeysee/drmonkeysee.github.io.git
```

Remember that my repository is named drmonkeysee but yours will be named after your GitHub username. At this point you should have a local repository cloned into a **drmonkeysee.github.io** folder.

Now switch to that folder and create a simple index page:

```sh
$ cd drmonkeysee.github.io
$ echo "<html><body><h1>Watch this space...</h1></body></html>" > index.html
```

Now commit your file and push to the remote origin on GitHub:

```sh
$ git add index.html
$ git commit -m "Test hosting"
$ git push
```

Now if you open a browser and navigate to `http://drmonkeysee.github.io/` you should see an extremely boring web page! Oh boy!

## Enter Pelican

That was pretty easy but you're gonna hit a wall real fast writing your website with `echo`. Ideally you want to write your pages in a nice text editor using a cleaner syntax than HTML, such as [Markdown](https://daringfireball.net/projects/markdown/) or [reST](http://docutils.sourceforge.net/rst.html). Fortunately static-site generators exist and we will use one of them, Pelican, to do our heavy lifting.
