Title: Theme Base Design
Category: blog
Tags: pelican, blogging, theming
Summary: Building a theme: the basics
Date: 2015-12-19

The first step for my custom theme is designing the basic structure of every page, placed in **base.html**. I decided the first step of *that* process is making the machines happy. Picking out the meta tags, feed links, title, doctype, and all the other tags that no one sees but tells various computers what's going on.

Layout and other visual elements will come later, though I've already decided what I'll start with. As mentioned in an [earlier post]({filename}/theme-shopping.markdown) I'm going to base my theme on [Bootstrap](http://getbootstrap.com). It's not clear to me if I want to pull in [Font Awesome](http://fontawesome.io), although the icon list looks very promising. I do know I don't want to write something from the ground-up. I don't particularly enjoy endlessly tweaking CSS and that will be my entire life if I start with a blank canvas.

I'll be closely following the [theme documentation](http://docs.getpelican.com/en/3.6.3/themes.html) for Pelican, the [Jinja2 docs](http://jinja.pocoo.org/docs/dev/templates/), as well as referencing various repos for examples.

## Styling

Grabbing Bootstrap is easy enough. There are CDN links for both [Bootstrap](https://www.bootstrapcdn.com) and [jQuery](https://code.jquery.com) so those will be the first thing to throw into **base.html**. That way I don't have to pull the files in myself, I can leverage existing browser caches, and I can easily update the frameworks the next time they release.

As per best practice, CSS goes in the `<head>` and JavaScript goes at the bottom of the `<body>`.

## Meta tags

There's a thousand different meta tags out there and it can be difficult to determine exactly what any particular page needs. I'm using [this list](http://code.lancepollard.com/complete-list-of-html-meta-tags/) as a handy guide and will be picking-and-choosing as I go. The nice thing about having a reference like this is it brings to my attention elements I wouldn't have thought of otherwise, like the Apple-specific tags, but we can look into those later. To start with we'll add the minimum:

- charset to be a good web citizen
- author and subject for self-aggrandizement
- the required tags for Bootstrap

In addition there will be content-specific tags that child templates will insert so we'll add a meta tag block to hook into. This includes:

- OpenGraph tags for sharing on Facebook, though it's unclear to me what `og:image` would be
- let's give Twitter some love as well
- description and keywords

Those basics give us this for **base.html**:

```html
    <!-- browsers want this to be the first tag -->
    <meta charset="UTF-8">
    <!-- these two are required by Bootstrap -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- now I start talking about myself -->
    <meta name="author" content="{{ AUTHOR }}">
    <meta name="subject" content="Dr Monkeysee's Dev Log">
    {% block metatags %}
    {% endblock metatags %}
```

## Feeds

By default Pelican generates ATOM feeds for the main page and each category. Feeds can be generated for other pages like tags, as well as RSS variants for everything, but I don't see the need for it. The other pages won't be interesting in a temporal sense and anything that can read RSS today can also read ATOM.

The everything feed will go in **base.html** and the category-specific feed link will go in **category.html**. Doing this avoids lots of extra conditional logic found in most examples.

Throwing together a quick-and-dirty **category.html** lets me test whether the feed insertion is working. **base.html** and **category.html** together gives us:

```html
<!-- base.html -->
    {% if FEED_ALL_ATOM %}
    <link href="{{ FEED_ALL_ATOM }}" rel="alternate" type="application/atom+xml" title="Everything Atom Feed">
    {% endif %}
    {% block links %}
    {% endblock links %}
```

```html
<!-- category.html -->
{% block links %}
    {% if CATEGORY_FEED_ATOM %}
    <link href="{{ CATEGORY_FEED_ATOM|format(category) }}" rel="alternate" type="application/atom+xml" title="{{ category|title }} Atom Feed">
    {% endif %}
{% endblock links %}
```
## All Together

There's a few other administrivia we can include at this point like Google Analytics script blocks, title tags, and stubbing out a section for content. Once we start looking at layout we'll figure out where common elements like headers and footers go but that's for another day.

Put it all together and the initial **base.html** is:

```html
<!DOCTYPE html>
<html lang="{{ DEFAULT_LANG }}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="{{ AUTHOR }}">
    <meta name="subject" content="Dr Monkeysee's Dev Log">
    {% block metatags %}
    {% endblock metatags %}
    <title>{% block title %}{{ SITENAME }}{% endblock title %}</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    {% if FEED_ALL_ATOM %}
    <link href="{{ FEED_ALL_ATOM }}" rel="alternate" type="application/atom+xml" title="Everything Atom Feed">
    {% endif %}
    {% block links %}
    {% endblock links %}
  </head>
  <body>
    {% block content %}
    {% endblock content %}
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  </body>
```

Some details have been truncated or omitted for brevity but you get the idea. I notice in a lot of examples the base template defines a block that encompasses the entire `<head>` tag but at this point I don't see a use-case where any child template will override the entire tag. Until that need arises I'm defining blocks for extending common elements like meta tags and links. The content block may become more nuanced once I start on layout but for now a simple block emcompassing all visual elements makes for easy testing of child templates.

Speaking of which, I need to start defining those. Up next, layout!
