#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Dr Monkeysee'
SITENAME = 'Dev Log and also Other Blog Stuff too'
SITEURL = 'http://drmonkeysee.github.io'
PATH = 'content'
TIMEZONE = 'America/Los_Angeles'
DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'))

# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/drmonkeysee'),
          ('GitHub', 'https://github.com/drmonkeysee'),
          ('Email', 'mailto:drmonkeysee@gmail.com'))

GITHUB_URL = 'https://github.com/drmonkeysee'
TWITTER_USERNAME = 'drmonkeysee'
DEFAULT_PAGINATION = 10
THEME = 'notmyidea'
DISPLAY_CATEGORIES_ON_MENU = False
RELATIVE_URLS = True

# Url stuff
DEFAULT_DATE = 'fs'
SLUGIFY_SOURCE = 'basename'
ARTICLE_URL = '{slug}'
ARTICLE_SAVE_AS = '{slug}/index.html'
TAG_URL = '{slug}'
TAG_SAVE_AS = '{slug}/index.html'
CATEGORY_URL = '{slug}'
CATEGORY_SAVE_AS = '{slug}/index.html'
# the theme still includes and links to author, it's just a blank url
AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
