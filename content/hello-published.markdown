Title: Hello Published!
Category: blog
Tags: pelican, blogging
Summary: Hey look! Published!

After fiddling with lots of settings and url schemes publishing was **super** easy! Turns out the current version of Pelican (3.6.3 as of this writing) auto-generates github page scripts so one `make github` call later and \*POOF\* my dev log is a real boy.

At the moment I'm still running on the built-in theme so I to need fix that. You may notice the author link doesn't go anywhere. I'm the only author but the theme is stubbornly insisting on linking to it anyway. I gotta do some other spicing up like a fancy favicon or something.

As for plugins, hopefully there's something that sets meta tags. All the cool kids have meta tags these days. And GitHub-style code blocks. Oh, looks like the default settings already have that:

```javascript
document.write('a fancy blog');
```

Also I haven't picked a license yet so... uh... no one steal anything in the meantime! Next step: make this blog post obsolete by changing everything about how the blog works.
