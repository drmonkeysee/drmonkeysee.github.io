Title: Pelican blog setup
Category: blog
Tags: pelican, blogging
Summary: Setting up a blog with Pelican
Date: 2015-12-15

How did I set up this blog? Let's find out.

First, I followed a [couple](http://mathamy.com/migrating-to-github-pages-using-pelican.html) [handy](http://ntanjerome.org/blog/how-to-setup-github-user-page-with-pelican/) [guides](https://fedoramagazine.org/make-github-pages-blog-with-pelican/). I encourage everyone to go check them out, but I found they were slightly out of date with the latest version of Pelican so I'll document my own setup process here. Maybe someday this too will be a handy guide.

## Hosting on GitHub Pages

I already have a GitHub account so it's a natural fit to host my blog on GitHub Pages, especially given this is primarily about stuff in said GitHub account. GitHub Pages provides a location to host a static site. The emphasis is on *static* site; there is no server-side framework so my blog must be made up of HTML, CSS, and JavaScript files. Which is just fine by me. I have a lot of experience with server-side web frameworks and there's very little reason why a blog needs that horsepower (I'm sure the people at [Squarespace](http://www.squarespace.com) are very nice). Also hosting on GitHub Pages allows me to write and publish with the same programming workflow I'm already used to instead of relying on a weird web editor or something. A static site generator will fit the bill nicely but we'll get to that later.

Starting at my [GitHub](https://github.com) account I head over to the [GitHub Pages documentation](https://pages.github.com) and follow the instructions to set up a "User or organization site". At the end of it I have a new repository: `drmonkeysee.github.io`.

## Does the hosting work?

Let's find out if this hosting is up-to-snuff. First thing, clone the repository locally and create a simple index page:

```sh
$ git clone git@github.com:drmonkeysee/drmonkeysee.github.io.git
$ cd drmonkeysee.github.io
$ echo "<html><body><h1>Watch this space...</h1></body></html>" > index.html
```

I'm cheating a little here as I actually used vim to create a valid HTML5 page but that's harder to show than a single `echo` line. I'm sure you can imagine it. Now we commit the file and push to the remote origin on GitHub:

```sh
$ git add index.html
$ git commit -m "Test hosting"
$ git push
```

Opening a browser and navigating to `http://drmonkeysee.github.io/` we see a live site. Times New Roman on a white background, party like it's 1996!

## Enter Pelican

That was pretty easy but we're gonna hit a wall real fast writing a blog with `echo`. We want to compose our entries in a nice text editor like a civilized person. It's the 21st century so we shouldn't need to put up with HTML either, opting for a cleaner syntax like [Markdown](https://daringfireball.net/projects/markdown/) or [reST](http://docutils.sourceforge.net/rst.html). Static-site generators will do the heavy lifting for us. GitHub Pages recommends [Jekyll](http://jekyllrb.com) but I'm gonna use [Pelican](http://docs.getpelican.com/en/3.6.3/) as I like Python more than Ruby.

Our site will be hosted from the `master` branch. Anything that's not part of our site therefore needs to live in a different branch, otherwise source code, configuration files, readmes, what-have-you will all be served to the public web. That would be a mess. So we'll create a `source` branch for our development environment.

```sh
$ git checkout -b source
```

Everything we write including Pelican-related code, blog entry text files, and themes will live in the `source` branch and the auto-generated output of Pelican will live in the `master` branch. As we will see, Pelican makes this super easy. Some of the handy guides suggest keeping the blog source code in a separate repository and only putting deployed site content into the blog repo, or creating a third branch, `gh-pages`, that would temporarily contain the published content before merging to `master`. This was probably a reasonable approach with earlier versions of Pelican but these days it supports publishing from an arbitrary branch so we can keep things nice and simple.

I already have Python 3.5 installed (don't let anyone tell you to settle for 2.7) so we can jump right into setting up Pelican. To keep things tidy we'll create a [virtual environment](http://docs.python-guide.org/en/latest/dev/virtualenvs/):

```sh
$ pyvenv venv
$ source venv/bin/activate
$ pip install pelican Markdown ghp-import
```

This installs pelican for obvious reasons, markdown so we can write blog posts in markdown, and ghp-import so we can publish to GitHub Pages. The next step is run the quickstart script:

```sh
$ pelican-quickstart
...
> Where do you want to create your new web site? [.] 
> What will be the title of this web site? Dev Log and also other Blog Stuff too
> Who will be the author of this web site? Brandon Stansbury
> What will be the default language of this web site? [en] 
> Do you want to specify a URL prefix? e.g., http://example.com   (Y/n) 
> What is your URL prefix? (see above example; no trailing slash) http://drmonkeysee.github.io       
> Do you want to enable article pagination? (Y/n)  
> How many articles per page do you want? [10] 
> What is your time zone? [Europe/Paris] America/Los_Angeles
> Do you want to generate a Fabfile/Makefile to automate generation and publishing? (Y/n) 
> Do you want an auto-reload & simpleHTTP script to assist with theme and site development? (Y/n) 
> Do you want to upload your website using FTP? (y/N) 
> Do you want to upload your website using SSH? (y/N) 
> Do you want to upload your website using Dropbox? (y/N) 
> Do you want to upload your website using S3? (y/N) 
> Do you want to upload your website using Rackspace Cloud Files? (y/N) 
> Do you want to upload your website using GitHub Pages? (y/N) y
> Is this your personal page (username.github.io)? (y/N) y
```

Pelican creates a bunch of files and we're ready to rock. The questions are pretty straightforward but note that I've asked for a Fabfile/Makefile and an auto-reload script. The combination of the two allows us to run several handy Pelican commands including local hosting for development and publishing to our remote master branch.

Time zone stymied me for a moment. Like any good developer I have a sextant and stable pendulum so I know what time zone I'm in but it was unclear what format Pelican expected. Is it PST? US/Pacific? What if I get it wrong? Turns out this ends up in a config file so it's easy to fix later but Pelican is expecting the tz  name listed in [this table](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Now you know.


So we have an empty Pelican site and a bunch of auto-generated scripts. Head over to the [gitignore repo](https://github.com/github/gitignore), grab the Python template, add **venv/** and **output/** to the ignore list, and commit everything into the `source` branch. Now we write a hello world post, get bored, and never write anything again!

Next time we'll tackle writing and publishing the first blog entry, as well as blog configuration.
