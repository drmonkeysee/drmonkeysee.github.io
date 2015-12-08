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

How did I set up this blog? Let's find out.

First I followed a [couple](http://mathamy.com/migrating-to-github-pages-using-pelican.html) [handy](http://ntanjerome.org/blog/how-to-setup-github-user-page-with-pelican/) [guides](https://fedoramagazine.org/make-github-pages-blog-with-pelican/). I encourage everyone to go check them out, but I found they were slightly out of date with the latest version of Pelican so I'll document my own setup process here so it may also some day be a handy guide.

## Hosting on GitHub Pages

I already have a GitHub account so it's a natural fit to host my blog on GitHub Pages, especially given this is primarily about stuff on said GitHub account. GitHub pages provides a convenient location to serve a static site. The emphasis is on *static* site; there is no server-side framework so my blog must be made up of HTML, CSS, and JavaScript files. Which is just fine by me. I have a lot of experience with server-side web frameworks and there's very little reason why a blog needs that horsepower (I'm sure the people at [Squarespace](http://www.squarespace.com) are very nice). Also hosting on GitHub Pages allows me to write and publish within the same workflow I'm already using to program in instead of relying on some weird web editor or something.

Hence the need for a static site generator like [Jekyll](http://jekyllrb.com) (which GitHub Pages recommends) or [Pelican](http://docs.getpelican.com/en/3.6.3/) (because I like Python better than Ruby).

Starting at my [GitHub](https://github.com) account I head over to the [GitHub Pages documentation](https://pages.github.com) and follow the instructions to set up a "User or organization site". At the end of it I have a new repositiory: `drmonkeysee.github.io`.

Note a user site will be hosted from the **master** branch. We'll use that to our benefit once Pelican enters the scene.

## Does the Hosting work?

Now let's find out if this hosting is up-to-snuff. The first thing we do is clone the repository down locally:

```sh
$ git clone git@github.com:drmonkeysee/drmonkeysee.github.io.git
```

Now we switch to that folder and create a simple index page:

```sh
$ cd drmonkeysee.github.io
$ echo "<html><body><h1>Watch this space...</h1></body></html>" > index.html
```

I'm cheating a little here as I actually used vim and created a valid html5 page but that's harder to show in a single `echo` line. I'm sure you can imagine it. Now we commit the file and push to the remote origin on GitHub:

```sh
$ git add index.html
$ git commit -m "Test hosting"
$ git push
```

Opening a browser and navigating to `http://drmonkeysee.github.io/` we see an extremely boring web page! Times New Roman on a white background, party like it's 1996.

## Enter Pelican

That was pretty easy but we're gonna hit a wall real fast writing a blog with `echo`. We want to write our pages in a nice text editor like a civilized person. It's the 21st century so we shouldn't need to put up with HTML either, opting for a cleaner syntax like [Markdown](https://daringfireball.net/projects/markdown/) or [reST](http://docutils.sourceforge.net/rst.html). Fortunately static-site generators exist and we will use one of them, Pelican, to do our heavy lifting.
