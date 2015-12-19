Title: Theme Outline
Category: blog
Tags: pelican, blogging, theming
Summary: Outlining the blog's theme
Status: draft

The first step for my custom theme is figure out all the stuff you *don't* see: meta tags, feeds, and styling frameworks. As mentioned in an [earlier post]({filename}/theme-shopping.markdown) I'm going to base my theme on [Bootstrap](http://getbootstrap.com). It's not clear to me if I want to pull in [Font Awesome](http://fontawesome.io), although the icon list looks very promising. I do know I don't want to write something from the ground-up. I don't particularly enjoy endlessly tweaking CSS and that will be my entire life if I start with a blank canvas.

I'll be following closely the [theme documentation](http://docs.getpelican.com/en/3.6.3/themes.html) for Pelican as well as referencing various repos for examples. The first thing I need is **base.html** to define the basic skeleton of every page, which conveniently is where the tags I'm discussing here will live.

## Styling

Grabbing Bootstrap is easy enough. There are CDN links for both [Bootstrap](https://www.bootstrapcdn.com) and [jQuery](https://code.jquery.com) so those will be the first thing to throw into **base.html**. That way I don't have to pull the files in myself, I can leverage existing browser caches, and I can easily update the frameworks the next time they release.

As per best practice, CSS goes in the `<head>` and JavaScript goes at the bottom of the `<body>`.

## Meta tags

There's a thousand different meta tags out there and it can be difficult to determine exactly what any particular page needs. I'm using [this list](http://code.lancepollard.com/complete-list-of-html-meta-tags/) as a handy guide and will be picking-and-choosing as I go. The nice thing about having a list like this is it brings to my attention elements I wouldn't have thought of otherwise, like the Apple-specific tags, but we can look into those later. To start with we'll add the minimum:

- charset to be a good web citizen
- author and subject for self-aggrandizement
- the required tags for Bootstrap
- OpenGraph tags for sharing on Facebook, though it's unclear to me what `og:image` would be
- let's give Twitter some love as well
- description and keywords

The later three will vary depending on the page so **base.html** doesn't define anything except a child-template block.

## Feeds

By default Pelican generates ATOM feeds for the main page and each category. Feeds can be generated for other pages like tags, as well as RSS variants for everything, but I don't see the need for it. The other pages won't be interesting in a temporal sense and anything that can read RSS today can also read ATOM.

The everything feed will go in **base.html** and the category-specific feed link will go in **category.html**. Doing this avoids lots of extra conditional logic in the template that a lot of examples use.

## All Together

- show code samples and wrap up

# Outline

- base it on bootstrap for ease of styling and responsive design
- want a minimal look so it doesn't look like a flashy bootstrap site
- html5 compliant with structural/semantic tags and appropriate metadata (research for this)
- don't care about older browsers?
- do care about mobile
- control over theme, including upgrading bootstrap and other dependencies
- metatags:
	- feeds
	- rel links
	- og tags
	- twitter tags
	- other social networks?
	- meta tags like author, etc
	- https://gist.github.com/kevinSuttle/1997924
